let navFolded = false;

function fold(event) {
    event.preventDefault();
    const nav = document.getElementById('nav');
    const main = document.getElementById('main');
    const cat = document.getElementById('fold_games');
    const rows = document.getElementsByClassName('row');
    const filler = document.getElementById('filler');
    const foldnav = document.getElementById('fold_nav')
    const imgs = foldnav.getElementsByTagName('img')

    if (!navFolded) {
        for (let row of rows) {
            const p = row.getElementsByTagName('p');
            if (p[0]) p[0].style.display = 'none';
        }
        if (cat) {
            const catp = cat.getElementsByTagName('p');
            for (let p of catp) p.style.display = 'none';
            const cata = cat.getElementsByTagName('a');
            for (let a of cata) a.style.display = 'none';
        }
        for (let img of imgs){
            img.style.transition=`0.5s`
            img.style.transform=`rotate(180deg)`
        }
        if (nav) nav.style.width = '81.25px';
        if (filler) filler.style.width = '81.25px';
        if (main) main.style.width = 'calc(100% - 81.25px)';
        navFolded = true;
    } 

    else{
        for (let row of rows) {
            const p = row.getElementsByTagName('p');
            if (p[0]) p[0].style.display = '';
        }
        if (cat) {
            const catp = cat.getElementsByTagName('p');
            for (let p of catp) p.style.display = '';
            const cata = cat.getElementsByTagName('a');
            for (let a of cata) a.style.display = '';
        }
        for (let img of imgs) img.style.transform=`rotate(90deg)`
        if (nav) nav.style.width = '335px';
        if (filler) filler.style.width = '300px';
        if (main) main.style.width = 'calc(100% - 300px)';
        navFolded = false;
    }
}

function unfold(event){
    event.preventDefault();
    const nav = document.getElementById('nav');
    const cat = document.getElementById('fold_games');
    const rows = document.getElementsByClassName('row');
    const unfold = document.getElementById('mini_unfold')
    const unfold2 = document.getElementById('containerr')
    const imgs = unfold2.getElementsByTagName('img')

    if (navFolded) {
        for (let row of rows) {
            const p = row.getElementsByTagName('p');
            if (p[0]) p[0].style.display = 'none';
        }
        if (cat) {
            const catp = cat.getElementsByTagName('p');
            for (let p of catp) p.style.display = 'none';
            const cata = cat.getElementsByTagName('a');
            for (let a of cata) a.style.display = 'none';
        }
        for (let img of imgs) img.style.transform=`rotate(90deg)`
        if (nav) nav.style.width = '87.5px';
        if (unfold) unfold.style.left='10px';
        if (unfold2) unfold2.style.left='10px';
        navFolded = false;
    } 

    else{
        if (nav) {
            const navPs = nav.getElementsByTagName('p');
            for (let p of navPs) {
                p.style.display = 'flex';
            }
        }
        const foldGames = document.getElementById('fold_games');
        if (foldGames) {
            const foldGamesPs = foldGames.getElementsByTagName('p');
            for (let p of foldGamesPs) {
                p.style.display = 'flex';
            }
            const foldGamesAs = foldGames.getElementsByTagName('a');
            for (let a of foldGamesAs) {
                a.style.display = 'flex';
            }
        }
        for (let img of imgs){
            img.style.transition=`0.5s`
            img.style.transform=`rotate(180deg)`
        }
        if (nav) nav.style.width = '335px';
        if (unfold) unfold.style.left='35px';
        if (unfold2) unfold2.style.left='35px';
        navFolded = true;
    }
}

let Folded = false;

function minifold(event) {
    event.preventDefault();
    const gameLinks = document.getElementById('game_links');
    const gameRows = gameLinks ? gameLinks.getElementsByClassName('row') : [];
    const gamesMini = document.getElementById("games_mini")
    const foldGames = document.getElementById("fold_games")
    const foldnav = document.getElementById('minifoldd')
    const imgs = foldnav.getElementsByTagName('img')

    if(!Folded){
        for (let row of gameRows) {
            row.style.display = 'none';
        }
        for (let img of imgs){
            img.style.transition=`0.5s`
            img.style.transform=`rotateY(180deg)`
        }
        gamesMini.style.height = `50px`;
        foldGames.style.height = `50px`;
        Folded = true;
    } 

    else{
        for (let row of gameRows) {
            row.style.display = '';
        }
        for (let img of imgs) img.style.transform=`rotate(180deg)`
        gamesMini.style.height = `490px`;
        foldGames.style.height = `10%`;
        Folded = false;
    }
}