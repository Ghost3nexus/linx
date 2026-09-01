"""
LINX 60秒広告の差し替え。
 ① チャットパネル（後半・分割画面）の実店名と実料金 → 架空の FIT BASE 渋谷店 に統一
 ② 「月額 ¥29,800」→「月額 ¥19,800」（LPの想定小売に合わせる）
元動画は書き換えず、別ファイルに出力する。
"""
import subprocess, sys
import numpy as np
from PIL import Image, ImageDraw, ImageFont

SRC = "/Users/koudzukitakahiro/Downloads/linx-ad-60s-final-sfx 2.MP4"
DST = "/private/tmp/claude-501/-Users-koudzukitakahiro-Desktop-TomorrowProofagent/f1880fdc-2859-49ee-a7b3-8f6636a7351d/scratchpad/linx-ad-60s-fitbase.mp4"
W, H, FPS = 1280, 720, 24

BODY = "/System/Library/Fonts/ヒラギノ角ゴシック W3.ttc"
BOLD = "/System/Library/Fonts/ヒラギノ角ゴシック W6.ttc"
INK, WHITE, BLACK = (34, 34, 34), (255, 255, 255), (0, 0, 0)

PANEL_BG = np.array([115, 146, 190])
REF_T, SCROLL = 26.0, 70.0

# チャットパネル側の差し替え（y は t=26.0 時点の値）
CHAT = [
    dict(y=23,  x0=828, x1=984, tx=831, text="FIT BASE 渋谷店の"),
    dict(y=304, x0=913, x1=979, tx=916, text="¥8,800/月"),
    dict(y=324, x0=878, x1=944, tx=881, text="¥6,600/月"),
    dict(y=759, x0=828, x1=974, tx=831, text="FIT BASE 渋谷店"),
]

CLAIM_WINDOW = (40.0, 48.0)   # 「応答率 98%」カードが出る区間
CLAIM_TEXT = "24時間 自動応答"   # 裏付けの要る成績主張をやめ、製品の仕様に置き換える

f_body = ImageFont.truetype(BODY, 14, index=0)
f_claim = ImageFont.truetype(BOLD, 72, index=0)
f_bold = ImageFont.truetype(BOLD, 76, index=0)
_b1 = f_bold.getbbox("1")

def is_chat_frame(arr):
    """分割画面（左=寝室 / 右=チャットパネル）か。フェード中は弾く。"""
    if np.abs(arr[700, 1270].astype(int) - PANEL_BG).max() > 6:
        return False
    return arr[360, 300].mean() < 110

PRICE_WINDOW = (47.5, 52.5)   # 「月額」カードが出る区間。他シーンへの誤爆を防ぐ

def is_price_frame(arr, t):
    """「月額 ¥29,800」のカードか。時間窓と字形の両方で判定する。"""
    if not (PRICE_WINDOW[0] <= t <= PRICE_WINDOW[1]):
        return False
    if arr[5, 5].mean() > 12:
        return False
    # 「月」「2」が明るく、その右外側（文字が無い領域）は黒いこと
    return (arr[326:400, 376:435].mean() > 90
            and arr[326:400, 610:657].mean() > 90
            and arr[326:400, 950:1200].mean() < 12)

def is_claim_frame(arr, t):
    """「応答率 98%」のカードか。"""
    if not (CLAIM_WINDOW[0] <= t <= CLAIM_WINDOW[1]):
        return False
    if arr[5, 5].mean() > 12:
        return False
    return (arr[325:393, 426:496].mean() > 80
            and arr[325:393, 786:851].mean() > 80
            and arr[325:393, 950:1200].mean() < 12
            and arr[325:393, 100:350].mean() < 12)


def process(im, arr, t):
    d = ImageDraw.Draw(im)
    if is_chat_frame(arr):
        dy = -SCROLL * (t - REF_T)
        for tg in CHAT:
            yi = int(round(tg["y"] + dy))
            top, bot = yi - 5, yi + 17
            if bot < 0 or top > H - 1:
                continue
            top, bot = max(0, top), min(H - 1, bot)
            d.rectangle([tg["x0"], top, tg["x1"], bot], fill=WHITE)
            d.text((tg["tx"], yi - 2), tg["text"], font=f_body, fill=INK)
    elif is_price_frame(arr, t):
        d.rectangle([604, 316, 660, 408], fill=BLACK)
        x = 633 - (_b1[2] - _b1[0]) // 2 - _b1[0]
        d.text((x, 328 - _b1[1]), "1", font=f_bold, fill=WHITE)
    elif is_claim_frame(arr, t):
        d.rectangle([300, 310, 980, 410], fill=BLACK)
        bb = f_claim.getbbox(CLAIM_TEXT)
        cx = 638 - (bb[2] - bb[0]) // 2 - bb[0]
        d.text((cx, 325 - bb[1]), CLAIM_TEXT, font=f_claim, fill=WHITE)
    return im

dec = subprocess.Popen(
    ["ffmpeg", "-v", "error", "-i", SRC, "-f", "rawvideo", "-pix_fmt", "rgb24", "-"],
    stdout=subprocess.PIPE)
enc = subprocess.Popen(
    ["ffmpeg", "-v", "error", "-y",
     "-f", "rawvideo", "-pix_fmt", "rgb24", "-s", f"{W}x{H}", "-r", str(FPS), "-i", "-",
     "-i", SRC, "-map", "0:v", "-map", "1:a?",
     "-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p",
     "-c:a", "copy", "-shortest", DST],
    stdin=subprocess.PIPE)

n, chat_n, price_n, claim_n = 0, 0, 0, 0
size = W * H * 3
while True:
    raw = dec.stdout.read(size)
    if len(raw) < size:
        break
    arr = np.frombuffer(raw, np.uint8).reshape(H, W, 3)
    t = n / FPS
    if is_chat_frame(arr):
        chat_n += 1
    elif is_price_frame(arr, t):
        price_n += 1
    elif is_claim_frame(arr, t):
        claim_n += 1
    im = process(Image.fromarray(arr.copy()), arr, t)
    enc.stdin.write(im.tobytes())
    n += 1

enc.stdin.close(); enc.wait(); dec.wait()
print(f"総フレーム {n}  チャット {chat_n}  料金 {price_n}  主張 {claim_n}")
