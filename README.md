# 약사와 함께 읽는 K-뷰티

서울특별시약사회 · 2026 건강서울페스티벌 "K-뷰티가 뭔가요?" 부스 안내 페이지예요.
부스에서 본 내용을 10가지 이야기로 자세히 만나볼 수 있어요.

- 정적 HTML/CSS/JS만 사용해요. 휴대폰 우선, PC에서는 조금 넓게 보여요.
- GitHub Pages: Settings → Pages → Branch `main` / `/ (root)`

## 구조

| 파일 | 내용 |
| --- | --- |
| `index.html` | 홈: 핵심 4가지 + 10가지 이야기 목차 |
| `ingredients.html` … `popular.html` | 이야기 1~10 (QR 주소 그대로 유지) |
| `assets/style.css` | 전체 디자인 (한 파일) |
| `assets/app.js` | 읽은 정도 표시, 목차 칩, 좌우로 밀어 이동 |

이야기 순서: ingredients → ingredients-more → routine → pharmacy → sunscreen → skin-concerns → medicine → irritation → why-kbeauty → popular
