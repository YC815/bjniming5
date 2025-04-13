from dotenv import load_dotenv
import os
from flask import Flask, request, jsonify
from PIL import Image, ImageDraw, ImageFont
from openai import OpenAI
import re
from instagrapi import Client

app = Flask(__name__)
user = ""
client = None

# 加载环境变量
load_dotenv()

# 初始化 OpenAI 客户端
client = OpenAI(api_key=os.getenv('API_KEY'))


def process_and_upload_to_instagram(user_text):
    global user, client
    user = user_text

    ai_response = client.chat.completions.create(model="gpt-3.5-turbo", messages=[
        {"role": "user", "content": "你是服務於濱江匿名網5.0的文字小編，請在60字內簡單幽默的回答「%s」這篇匿名訊息。" % (user)}
    ])
    ai_response = re.search(r"content='(.*?)', role", str(ai_response))
    ai = str(ai_response.group(1))
    print(ai)
    user = user.replace('\n', ' ')
    user = [user[i:i + 14] for i in range(0, len(user), 14)]
    user = "\n".join(user)
    ai = ai.replace('\n', ' ')
    ai = [ai[i:i + 17] for i in range(0, len(ai), 17)]
    ai = "\n".join(ai)

    image = Image.open('public/ins.jpg')
    draw = ImageDraw.Draw(image)

    font_path = "public/NotoSansTC-Regular.ttf"
    font = ImageFont.truetype(font_path, size=66)

    text_position_user = (50, 66)
    text_color = 'rgb(255, 255, 255)'
    draw.text(text_position_user, user, fill=text_color, font=font)

    font = ImageFont.truetype(font_path, size=56)
    text_position_ai = (50, 700)
    draw.text(text_position_ai, ai, fill=text_color, font=font)

    image.load()
    background = Image.new("RGB", image.size, (255, 255, 255))
    background.paste(image, mask=image.split()[3])

    background.save('public/ready.jpg', 'JPEG', quality=80)

    cl = Client()
    cl.login(os.getenv('USERNAME'), os.getenv('PASSWORD'))
    media = cl.photo_upload(
        "public/ready.jpg",
        "濱江匿名網5.0",
        extra_data={
            "custom_accessibility_caption": "alt text example",
            "like_and_view_counts_disabled": 0,
            "disable_comments": 0,
        }
    )
    media.dict()
    print("上傳了")


@app.route('/process-user', methods=['POST', 'OPTIONS'])
def process_user_route():
    if request.method == 'OPTIONS':
        response = app.response_class(
            response='',
            status=200,
            headers={
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        )
        print(response)
        return response

    user_text = request.json.get('user')
    process_and_upload_to_instagram(user_text)


if __name__ == '__main__':
    app.run(debug=True)
