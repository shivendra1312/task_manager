from fastapi_mail import FastMail, MessageSchema, ConnectionConfig, MessageType
from pydantic import EmailStr, BaseModel
from typing import List

class EmailSchema(BaseModel):
    email: List[EmailStr]

conf = ConnectionConfig(
    MAIL_USERNAME = "shivendrasharma6144@gmail.com",
    MAIL_PASSWORD = "rslm jtgx bajy hgsy",
    MAIL_FROM = "shivendrasharma6144@gmail.com",
    MAIL_PORT = 587,
    MAIL_SERVER = "smtp.gmail.com",
    MAIL_FROM_NAME="task_manager",
    MAIL_STARTTLS = True,
    MAIL_SSL_TLS = False,
    USE_CREDENTIALS = True,
    VALIDATE_CERTS = True
)


async def simple_send(emails:List[str]) :
    html = """<p>
Welcome to Task Manager!

Your account has been created successfully.

You can now create tasks, organize your work, and stay productive.

If you have any questions, feel free to reply to this email.

Best regards,
Task Manager Team</p> """

    message = MessageSchema(
        subject="Fastapi-Mail module",
        recipients=emails,
        body=html,
        subtype=MessageType.html)

    fm = FastMail(conf)
    await fm.send_message(message)
    return {"message": "email has been sent"}
