<?php
session_start();
require_once 'db.php';

header('Content-Type: application/json');

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['success' => false, 'error' => 'Not logged in']);
    exit;
}

$user_id = $_SESSION['user_id'];
$new_saldo = isset($_POST['saldo']) ? floatval($_POST['saldo']) : null;

if ($new_saldo === null) {
    echo json_encode(['success' => false, 'error' => 'No saldo provided']);
    exit;
}

// Update in database
$stmt = $pdo->prepare("UPDATE users SET saldo = :saldo WHERE id_u = :id");
$stmt->execute([':saldo' => $new_saldo, ':id' => $user_id]);

// Update session
$_SESSION['user_saldo'] = $new_saldo;

echo json_encode(['success' => true, 'saldo' => $new_saldo]);