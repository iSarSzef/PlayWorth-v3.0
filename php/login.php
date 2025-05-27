<?php
session_start();
require_once 'db.php';
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $log = $_POST['login_in'];
    $pass = $_POST['password'];

    $stmt = $pdo->prepare("SELECT id_u, login, password_hashed, saldo FROM users WHERE login = :login_in");
    $stmt->execute([':login_in' => $log]);
    $userData = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($userData && password_verify($pass, $userData['password_hashed'])) {
        $_SESSION['user_id'] = $userData['id_u'];
        $_SESSION['user_login'] = $userData['login'];
        $_SESSION['user_saldo'] = $userData['saldo'];
        header("Location: /index.php");
        exit();
    } else {
        echo "Invalid login or password.";
    }
}