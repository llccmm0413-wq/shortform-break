// api/board.js
// Vercel Serverless Function (Node.js runtime)
// 게시판 글을 Upstash Redis(Vercel Marketplace)에 저장해서 모든 방문자가 함께 보는 게시판입니다.
//
// 필수 준비: Vercel 대시보드 → Storage → Marketplace Database Providers 에서
// "Upstash"(Redis)를 선택해 데이터베이스를 만들고 이 프로젝트에 연결하세요.
// 연결하면 UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN 환경변수가
// 자동으로 채워집니다. (자세한 방법은 README.md 참고)

const { Redis } = require('@upstash/redis');

const redis = Redis.fromEnv();

const INDEX_KEY = 'board:index';
const POST_PREFIX = 'board:post:';
const MAX_LIST = 200;

module.exports = async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const ids = await redis.zrange(INDEX_KEY, 0, MAX_LIST - 1, { rev: true });

      if (!ids || ids.length === 0) {
        res.status(200).json({ posts: [] });
        return;
      }

      const keys = ids.map((id) => POST_PREFIX + id);
      const posts = await redis.mget(...keys);
      res.status(200).json({ posts: posts.filter(Boolean) });
      return;
    }

    if (req.method === 'POST') {
      const { nickname, title, content } = req.body || {};

      if (!title || typeof title !== 'string' || !title.trim()) {
        res.status(400).json({ error: '제목을 입력해주세요.' });
        return;
      }
      if (!content || typeof content !== 'string' || !content.trim()) {
        res.status(400).json({ error: '내용을 입력해주세요.' });
        return;
      }
      if (title.length > 100 || content.length > 2000) {
        res.status(400).json({ error: '입력이 너무 깁니다.' });
        return;
      }

      const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
      const post = {
        id,
        nickname: (nickname ? String(nickname) : '').trim().slice(0, 20) || '익명',
        title: title.trim().slice(0, 100),
        content: content.trim().slice(0, 2000),
        createdAt: new Date().toISOString()
      };

      await redis.set(POST_PREFIX + id, post);
      await redis.zadd(INDEX_KEY, { score: Date.now(), member: id });

      res.status(201).json({ post });
      return;
    }

    if (req.method === 'DELETE') {
      const id = (req.query && req.query.id) ? String(req.query.id) : '';

      if (!id) {
        res.status(400).json({ error: '삭제할 글의 id가 필요합니다.' });
        return;
      }

      await redis.del(POST_PREFIX + id);
      await redis.zrem(INDEX_KEY, id);

      res.status(200).json({ ok: true });
      return;
    }

    res.status(405).json({ error: '지원하지 않는 요청입니다.' });
  } catch (err) {
    console.error('Board API error:', err);
    res.status(500).json({ error: '게시판 서버에 문제가 생겼습니다. 잠시 후 다시 시도해주세요.' });
  }
};
