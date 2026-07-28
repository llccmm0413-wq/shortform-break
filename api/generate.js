// api/generate.js
const SYSTEM_PROMPT = `너는 "숏츠 브레이크"라는 숏폼(쇼츠, 릴스, 틱톡 등) 시청 절제 앱의 기능 기획 전문가야.
사용자가 자신의 숏폼 시청 습관이나 고민을 이야기하면, 그 상황에 맞춰 앱에 넣으면 좋을 "구체적인 제한/절제 기능"을 추천해줘.

응답 규칙:
- 반드시 한국어로 답한다.
- 마크다운 기호(*, #, ** 등)는 쓰지 않는다. 순수 텍스트로만 작성한다.
- 아래 형식을 그대로 따른다.

[상황 요약]
(사용자 입력을 1~2문장으로 요약)

[추천 기능]
1. 기능 이름 — 왜 이 기능이 이 사용자에게 필요한지, 어떻게 동작하면 좋은지 1~2문장
2. 기능 이름 — 설명
3. 기능 이름 — 설명
(사용자 상황에 맞게 3~5개, 너무 뻔한 "타이머" 하나로 퉁치지 말고 구체적으로)

[오늘의 팁]
(바로 실천할 수 있는 짧은 조언 한 문장)

전체 분량은 250자 내외로 간결하게 유지해.`;

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'POST 요청만 허용됩니다.' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: '서버에 GEMINI_API_KEY 환경변수가 설정되어 있지 않습니다.' });
    return;
  }

  const { message } = req.body || {};
  if (!message || typeof message !== 'string' || !message.trim()) {
    res.status(400).json({ error: '분석할 내용을 입력해주세요.' });
    return;
  }

  // 안전하고 호환성이 보장된 gemini-1.5-flash 모델 사용
  const model = process.env.GEMINI_MODEL || 'gemini-1.5-flash';
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  try {
    const geminiRes = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [
              { text: `${SYSTEM_PROMPT}\n\n[사용자 입력]\n${message.trim()}` }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800
        }
      })
    });

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      console.error('Gemini API 상세 에러:', JSON.stringify(data));
      // 클라이언트에 구글이 뱉은 진짜 에러 메시지를 전달하여 원인 파악
      res.status(geminiRes.status).json({ 
        error: `Gemini API 오류 (${geminiRes.status}): ${data?.error?.message || '알 수 없는 오류'}` 
      });
      return;
    }

    const result =
      data?.candidates?.[0]?.content?.parts?.map((p) => p.text || '').join('').trim() || '';

    if (!result) {
      res.status(502).json({ error: 'AI가 응답을 생성하지 못했습니다.' });
      return;
    }

    res.status(200).json({ result });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: `서버 내부 오류가 발생했습니다: ${err.message}` });
  }
};
