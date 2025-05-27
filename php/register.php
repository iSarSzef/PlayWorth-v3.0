<?php
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $login = $_POST['login'];
    $mail = $_POST['mail'];
    $password = $_POST['password'];
    $confirm = $_POST['confirm_password'];

    if ($password !== $confirm) {
        echo "Passwords do not match.";
        exit();
    }

    $stmt = $pdo->prepare("SELECT id_u FROM users WHERE login = ?");
    $stmt->execute([$login]);

    if ($stmt->rowCount() > 0) {
        echo "Login already exists.";
        exit();
    }

    $passwordHash = password_hash($password, PASSWORD_DEFAULT);
    $insert = $pdo->prepare("INSERT INTO users (login, mail, password_hashed) VALUES (?, ?, ?)");
    $insert->execute([$login, $mail, $passwordHash]);

    echo "<script>alert('Registration successful. You can now log in.'); window.location.href = 'login.html';</script>";
    exit();
}
?> 