import html2text
import traceback
import random

from django.core.mail import EmailMultiAlternatives

from frame.settings import DEFAULT_FROM_EMAIL
from frame.settings import SITE_NAME

def send_email(recipient, subject, body):
    try:
        email_to_use = DEFAULT_FROM_EMAIL
        text_body = html2text.html2text(body)

        email = EmailMultiAlternatives(subject, text_body, email_to_use, [recipient])
        email.attach_alternative(body, "text/html")

        email.send()

        ret_msg = "Message sent to {}".format(recipient)

        return ret_msg
    except Exception as ex:
        raise RuntimeError("Email sending failed\n{}\n{}".format(ex, traceback.format_exc()))

def send_verification_code_email(recipient, code):
    subject = SITE_NAME + ' Verification Code'
    body = """
    <p>Verify your email address<p>
    <br>
    <p>
    Your verification code is below — enter it in the Verification code input form.
    </p>
    <br>
    <p style="background-color: #f1f3f4">
    {}
    </p>
    <br>
    <p>
    If you didn’t request this email, please contact IT — you can safely ignore it.
    </p>
    """.format(code)
    send_email(recipient=recipient, subject=subject, body=body)

def generate_code(len):
    return ''.join(random.sample('0123456789', len))