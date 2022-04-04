//selecting  elements
const player0El = document.querySelector('.player--0'); //כל סקטור של שחקן 0//class
const player1El = document.querySelector('.player--1'); //כל סקטור של שחקן 1//class
const score0El = document.querySelector('#score--0'); //הניקוד שהצטבר לשחקן 0 ,מופיע מתחת לכותרת פלייר 0
const score1El = document.getElementById('score--1'); //הניקוד שהצטבר לשחקן 1 ,מופיע מתחת לכותרת פלייר 1
const current0El = document.getElementById('current--0'); //הניקוד של כל שחקן בכל זריקה ספציפית
const current1El = document.getElementById('current--1'); //הניקוד של כל שחקן בכל זריקה ספציפית

const diceEl = document.querySelector('.dice'); //במצב ההתחלתי הקוביה היתה על 5//בחירה של התמונה של הקוביה//

const btnNew = document.querySelector('.btn--new'); // בחירה מהדום של הכפתור ״ניו״
const btnRoll = document.querySelector('.btn--roll'); // בחירה מהדום של הכפתור ״רול״
const btnHold = document.querySelector('.btn--hold'); // בחירה מהדום של הכפתור ״הולד״

let scores, currentScore, activePlayer, playing; //הרעיוון הוא שנוכל להשתמש במשתנים אלו בכל  המשחק ולא רק בתוך הפונקציה איניט ולכן אלו משתנים גלובליים// שהמחשב יידע שקיימים כאלו משתנים
playing = true; //האם אנחנו משחקים או לא

currentScore = 0;
activePlayer = 0;

score0El.textContent = 0;
score1El.textContent = 0;

const switchPlayerFun = function () {
  //הגדרת פונקציה שתחליף בין השחקנים
  document.getElementById(`current--${activePlayer}`).textContent = 0; // מאפס את המשבצת הניקוד קורנט-סקור בדום,במסמך הטימל
  currentScore = 0; //אחרת,לשחקן 1 הניקוד של שחקן 0 יצטבר //מאפס את המקום בזיכרון שהוא תחת השם קורנט-סקור לשחקן הנוכחי,למשל שחקן 0
  activePlayer = activePlayer === 0 ? 1 : 0; //שינוי שחקנים,אם משחק שחקן 0 תחליף לשחקן 1 ואם משחק 1 אז תחליף 0
  player0El.classList.toggle('player--active'); //נניח כי משחק שחקן 0,המחשב יכבה את הגרפיקה של שחקן 0
  player1El.classList.toggle('player--active'); //ואז ידליק את הגפחקה של שחקן 1 (הגרפיקה נמצאת במסמך ה-סי-אס-אס)
};

//Starting condition
scores = [0, 0]; //0,1

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0; //הניקוד של שחקן 0 יהיה שווהמוצג ושוו להאפס
  score1El.textContent = 0; //הניקוד של שחקן 1 יהיה שווהמוצג ושוו להאפס
  current0El.textContent = 0; //הניקוד של שחקן 0 יהיה מוצג ושווה לאפס
  current1El.textContent = 0; //הניקוד של שחקן 1 יהיה שווהמוצג ושוו להאפס

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init(); //נקרא לפונקציה איניט וזה יאפס את הפרטים של המשחק

diceEl.classList.add('hidden'); // נלך לקוביה ונפעיל עליה את היידן שיצרנו במסמך ה-סי-אס-אס הקוביה תיעלם

//  אם פליינג הוא טרו אז רק תפעיל את כל הפונקציה הזו
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1; //Generating  a random dice roll,(1,2,3,4,5,6)
    console.log(dice); //מדפיס מספר  אקראי בין 1 ל-6 בקונסול
    diceEl.classList.remove('hidden'); //תציג את הקוביה שבתחילת המשחק,בתחילת המשחק המספר המוצג על הקוביה היה שווה ל-5
    diceEl.src = `dice-${dice}.png`; //ישנה את התמונה של דייס-5 ל-דייס-2 למשל
    //בדיקה האם התקבל המספר 1
    if (dice !== 1) {
      currentScore += dice; ////נניח התחלנו בשחקן 0 אז הניקוד יעבור לשחקן 0 ,אחרי כמה סיבובים התקבל המספר 1 ואז המספרים יברו לשחקן 1//אם המספקר שונה מ-1 , תוסיף את הניקוד לקורנט-סקור
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore; //הצגה של הניקוד לכל שחקן ספציפי בחלון הקורנט
    } else {
      //אם המספר שווה ל-1 ,אם המספר שווה ל-1 נחליף את התור בין השחקנים
      //השחקן שיצא לו 1 הפסיד את הניקוד ולכן לא נשמר הניקוד
      switchPlayerFun();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //btnHold
    scores[activePlayer] = scores[activePlayer] + currentScore; //הוספת הניקוד לניקוד הכללי של כל משתמש//הניקוד הכללי של כל משתמש מאוחסן ברשימה שנקראית סקורס
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]; //מציג את  הניקוד הניקוד שהצטבר לשחקן
    // 2. Check if player's score is >= 20
    if (scores[activePlayer] >= 20) {
      //Finish the game
      playing = false;
      diceEl.classList.remove('hidden'); //ברגע שהשחקן מנצח נדאג להסתיר את הקוביה
      //mark the winner
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner'); //נקבע את הרקע של השחקן שיש לו מעל 20 נקודות ברקע שהגדרנו לשחקן המנצח (כי יש לו מעל 20 נקודות ולכן הוא מנצח)
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('.player--active'); //נסיר את הרקע  של אקטיב-פלייר על מנת שנוכל לראות את הרקע של השחקן המנצח
    } else {
      //אם לשחקן אין 100 נקודות
      switchPlayerFun(); //תחליף את התור בין השחקנים (כולל כל ההגדרות הנלוות)
    }
  }
});

btnNew.addEventListener('click', init);
