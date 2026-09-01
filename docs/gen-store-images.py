"""LINX 業種イメージの生成（Nano Banana Pro / Gemini API）"""
import base64, json, os, sys, urllib.request, pathlib

KEY = os.environ["GEMINI_API_KEY"]
MODEL = "gemini-3-pro-image"
OUT = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "gen")
OUT.mkdir(exist_ok=True)

# 8枚の見えを揃えるための共通指示。暗く敷いて使うので、主題は中央・構図は静かに。
STYLE = (
    "Photorealistic editorial interior photograph of a real business in Japan. "
    "Natural window light from the side, calm and premium atmosphere, uncluttered composition "
    "with the subject centred and generous negative space. "
    "Muted cinematic colour grade: warm neutrals, soft greens, deep shadows. "
    "Shot on a 35mm lens, shallow depth of field, no harsh flash. "
    "Absolutely no text, no signage, no lettering, no logos, no watermarks, no brand marks anywhere in the frame. "
    "Natural-looking Japanese people, relaxed and unposed, not looking at the camera."
)

SCENES = {
    "hero-gym": "A small modern personal-training gym: a trainer guiding one client through a dumbbell set, racks and a treadmill softly out of focus behind them.",
    "usecase-yoga": "A bright yoga studio: three people holding a standing pose on mats, tall windows behind them, pale wood floor.",
    "hero-salon": "A refined hair salon: a stylist finishing a client's hair at a mirror station, plants and warm wood shelving around.",
    "usecase-pilates": "A pilates studio: an instructor adjusting a client on a reformer machine, clean white walls, soft morning light.",
    "usecase-sauna": "A contemporary Japanese sauna lounge: two people resting on cedar benches after bathing, warm amber light, steam in the air.",
    "usecase-clinic": "A calm chiropractic and wellness clinic reception: a receptionist in a pale uniform behind a clean counter, flowers on the desk.",
    "usecase-studio": "A dance studio mid-class: several people moving together in front of a mirrored wall, ceiling spotlights.",
    "usecase-pickleball": "An indoor pickleball court: two players mid-rally near the net, bright ceiling lighting, blue court surface.",
}


def generate(name: str, scene: str) -> bool:
    body = {
        "contents": [{"parts": [{"text": f"{STYLE}\n\nScene: {scene}"}]}],
        "generationConfig": {
            "responseModalities": ["IMAGE"],
            "imageConfig": {"aspectRatio": "16:9"},
        },
    }
    req = urllib.request.Request(
        f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={KEY}",
        data=json.dumps(body).encode(),
        headers={"Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=300) as r:
            d = json.load(r)
    except urllib.error.HTTPError as e:
        print(f"  {name}: HTTP {e.code} {e.read().decode()[:300]}")
        return False

    for part in d.get("candidates", [{}])[0].get("content", {}).get("parts", []):
        inline = part.get("inlineData") or part.get("inline_data")
        if inline and inline.get("data"):
            p = OUT / f"{name}.png"
            p.write_bytes(base64.b64decode(inline["data"]))
            print(f"  {name}: {p.stat().st_size // 1024}KB")
            return True
    print(f"  {name}: 画像が返らなかった -> {json.dumps(d)[:300]}")
    return False


if __name__ == "__main__":
    only = sys.argv[2] if len(sys.argv) > 2 else None
    for name, scene in SCENES.items():
        if only and name != only:
            continue
        generate(name, scene)
