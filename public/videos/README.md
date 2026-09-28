# Hero video

- `/videos/hero.webm` — homepage hero loop (VP9, **opaque** yuv420p — no alpha channel)
- `/videos/hero.mp4` — H.264 fallback (Safari / if WebM fails)
- VP9 with alpha (`alpha_mode`) freezes on the first frame in Chrome when used as a CSS background `<video>` — always flatten before deploy.
- Poster/thumb: `/media/isle-video-thumb.jpg`
