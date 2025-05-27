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
    <link rel="stylesheet" href="shared.css">
    <link rel="stylesheet" href="thisorthat.css">
    <link rel="icon" type="image/x-icon" href="../favicon.png">
</head>

<body>
    <header>
        <div id="arrow_in_header">
            <a href="">
                <div id="fold_nav" onclick="fold(event)">
                    <img src="../others/arrow.png" alt="arrow" id="fold_arrow">
                </div>
            </a>
        </div>

        <div id="icon_in_header">
            <a href="../index.php" id="header_logo">
                <img src="../favicon.png" alt="logo">
            </a>
        </div>

        <div id="links">
            <a href="../index.php">Home</a>
        </div>

        <div id="log_in">
            <?php if ($isLoggedIn): ?>
                <div id="balance_box">
                    <span id="balance_amount"><?php echo number_format($userSaldo, 2); ?></span>
                    <img src="../others/token.png" alt="coin" id="balance_coin">
                    <a href="../deposit.php">
                        <button id="balance_add">+</button>
                    </a>
                </div>
                <div id="user_info">
                    <span>Welcome, <?php echo htmlspecialchars($userLogin) ?>!</span>
                    <a href="../php/logout.php"><div id="log_out_button">Log Out</div></a>
                </div>
            <?php else: ?>
                <a href="../login.html">
                    <div id="log_in_button">Log In</div>
                </a>
            <?php endif; ?>
        </div>
    </header>

    <nav id="nav">
        <div id="mini_unfold">
            <a href="" id="containerr" onclick="unfold(event)">
                <img src="../others/arrow.png" alt="arrow">
            </a>
        </div>
        <div class="container" id="main_container">
            <div class="container" id="games_mini">
                <div class="container" id="fold_games">
                    <img src="../others/crown.png" alt="crown">
                    <p>Games</p>
                    <a href="" class="container" onclick="minifold(event)">
                        <img src="../others/arrow.png" alt="arrow">
                    </a>
                </div>
                <div id="game_links">

                    <div class="row">
                        <a href="jackpot.php">
                            <img src="../game_icons/small/wheel_mini.png" alt="">
                            <p>Jackpot</p>
                        </a>
                    </div>
                    <div class="row">
                        <a href="ThisOrThat.php">
                            <img src="../game_icons/small/cards.png" alt="">
                            <p>This Or That</p>
                        </a>
                    </div>
                    <div class="row">
                        <a href="BlackJack.php">
                            <img src="../game_icons/small/cards.png" alt="">
                            <p>Blackjack</p>
                        </a>
                    </div>
                    <div class="row">
                        <a href="Slots.php">
                            <img src="../game_icons/small/seven.png" alt="">
                            <p>Slots</p>
                        </a>
                    </div>
                    <div class="row coming_soon">
                        <a href="../notfound.php">
                            <img src="../game_icons/small/bomb.png" alt="">
                            <p>Mines</p>
                        </a>
                        <div id="coming_soon1">Coming soon...</div>
                    </div>
                    <div class="row coming_soon">
                        <a href="../notfound.php">
                            <img src="../game_icons/small/roulette_mini.png" alt="">
                            <p>Roulette</p>
                        </a>
                        <div id="coming_soon2">Coming soon...</div>
                    </div>
                    <div class="row coming_soon">
                        <a href="../notfound.php">
                            <img src="../game_icons/small/cups_mini.png" alt="">
                            <p>Cups</p>
                        </a>
                        <div id="coming_soon3">Coming soon...</div>
                    </div>
                    <div class="row coming_soon">
                        <a href="../notfound.php">
                            <img src="../game_icons/small/rocket.png" alt="">
                            <p>Crash</p>
                        </a>
                        <div id="coming_soon4">Coming soon...</div>
                    </div>
                    <div class="row coming_soon">
                        <a href="../notfound.php">
                            <img src="../game_icons/small/cards.png" alt="">
                            <p>Poker</p>
                        </a>
                        <div id="coming_soon5">Coming soon...</div>
                    </div>

                </div>
            </div>

            <div class="container row" id="discord">
                <a href="https://discord.gg/e5SRFAWnu3">
                    <img src="../others/dsc.png" target="_blank" alt="discord" id="discord_icon">
                    <p>Discord</p>
                </a>
            </div>

            <div class="container row" id="support">
                <a href="mailto:playworth777@gmail.com" target="_blank">
                    <img src="../others/support.png" alt="support" id="support_icon">
                    <p>Support</p>
                </a>
            </div>
        </div>
    </nav>
    
    <div id="filler"></div>

    <main id="main">
        <div id="game">
            <div id="score"></div>
            <div id="gamee">
                <div id="cards">
                    <h1 id="h1">Red or Black?</h1>
                    <div id="parent">
                        <div class="card" id="current_card"></div>
                    </div>

                    <div id="choice"></div>
                </div>

                <div id="place_bet_container">
                    <form action="">
                        <input type="number" value="33" id="input" min="33" max="50000">
                        <input type="submit" id="submit" value="Play" onclick="shufflecardsandstartgame(event)">   
                    </form>
                </div>
            </div>
        </div>

        <div id="filler2"></div>

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
    </main>

    <script src="thisorthat.js"></script>
    <script src="../hamburger.js"></script>
    <script src="../totest.js"></script>
</body>
</html>