<?php
session_start();
$isLoggedIn = isset($_SESSION['user_id']);
$userLogin = isset($_SESSION['user_login']) ? $_SESSION['user_login'] : '';
$userSaldo = isset($_SESSION['user_saldo']) ? $_SESSION['user_saldo'] : 0;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PlayWorth | Win BIG at the Best Polish Gambling Site</title>
    <link rel="stylesheet" href="../main.css">
    <link rel="stylesheet" href="../deposit.css">
    <link rel="icon" type="image/x-icon" href="../favicon.png">
</head>

<body>
    <header>

        <div id="icon_in_header">
            <a href="../main.php" id="header_logo">
                <img src="../favicon.png" alt="logo">
            </a>
        </div>

        <div id="links">
            <a href="main.php">Home</a>
        </div>

        <div id="log_in">
            <?php if ($isLoggedIn): ?>
                <div id="balance_box">
                    <span id="balance_amount"><?php echo number_format($userSaldo, 2); ?></span>
                    <img src="others/token.png" alt="coin" id="balance_coin">
                    <button id="balance_add">+</button>
                </div>
                <div id="user_info">
                    <span>Welcome, <?php echo htmlspecialchars($userLogin) ?>!</span>
                    <a href="php/logout.php"><div id="log_out_button">Log Out</div></a>
                </div>
            <?php else: ?>
                <a href="../login.html">
                    <div id="log_in_button">Log In</div>
                </a>
            <?php endif; ?>
        </div>
    </header>

    <main>
        <section id="deposit">
            <h1>1$ = 414 <img src="../others/token.png" alt=""></h1>
            <div id="contain_div">
                <div class="contains_label">
                    <label for="howMuch">How much $ do you want to pay:</label>
                    <input id="howMuch" type="number" name="number" value="20.00" required>
                </div>
                <div class="contains_label">
                    <label for="email">Your email address:</label>
                    <input id="email" type="email" required>
                </div>
            </div><br>
            <div id="buttons">
                <button id="button1" onclick="b1(event)">10.00$</button>
                <button id="button2" onclick="b2(event)">20.00$</button>
                <button id="button3" onclick="b3(event)">50.00$</button>
                <button id="button4" onclick="b4(event)">100.00$</button>
                <button id="button5" onclick="b5(event)">250.00$</button>
                <button id="button6" onclick="b6(event)">500.00$</button>
            </div><br>
            <input type="submit" value="Deposit" id="submit">
        </section>
    </main>

    <footer>
            <section>
                <a href="" id="footer_logo">
                    <img src="../favicon.png" alt="logo">
                    <p id="one">Play</p>
                    <p id="two">Worth</p>
                </a>
                <p>PlayWorth is owned and operated by PlayWorth Studios Ltd., registration number: 42069, registered address: Somewhere in Rzeszów, Poland. Contact us at <a href="mailto:playworth777@gmail.com" target="_blank">playworth777@gmail.com</a>. PlayWorth is licensed and regulated by the Government of Rzeszów, Poland and operates under License No. ALSI-202405010-FI1. PlayWorth has passed all regulatory compliance and is legally authorized to conduct gaming operations for any and all games of chance and wagering. PlayWorth is not affiliated, associated, or partnered with any video game platforms.</p>
            </section>
            <hr> <br>
            <p>Copyright &copy; 2025 Playworth.com. All Rights Reserved.</p>

        </footer>
    <script src="../deposit.js"></script>
    <script src="../miniburger.js"></script>
    <script src="../hamburger.js"></script>
</body>
</html>