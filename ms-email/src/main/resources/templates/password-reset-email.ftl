<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
    <style>
        body {
font-family: Arial, sans-serif;
margin: 0;
padding: 0;
background-color: #f4f4f4;
color: #333;
}
.container {
width: 90%;
max-width: 600px;
margin: 20px auto;
padding: 20px;
background-color: #fff;
border-radius: 8px;
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
h2 {
color: #d9534f;
}
p {
line-height: 1.6;
}
.button {
display: inline-block;
padding: 10px 20px;
margin-top: 10px;
background-color: #5bc0de;
color: #fff;
text-decoration: none;
border-radius: 5px;
font-weight: bold;
}
.button:hover {
background-color: #31b0d5;
}
.footer {
font-size: 0.9em;
color: #777;
}
</style>
</head>
<body>
<div class="container">
        <h2>Important: Password Reset Request</h2>
        <p>The link to reset your password will expire in 15 minutes. Please use it as soon as possible.</p>
        <p>To reset your password, click the button below:</p>
        <p><a href="${resetLink}" class="button">Change your password here</a></p>
        <p class="footer">If you did not request this password reset, please ignore this email.</p>
    </div>
</body>
</html>