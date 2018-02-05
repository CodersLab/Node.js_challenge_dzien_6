<img alt="Logo" src="https://coderslab.pl/svg/logo-coderslab.svg" width="400">

# Node.js challenge

Witaj w challengu Node.js, gdzie codziennie przez 7 dni zdobędziesz konkretną dawkę informacji dotyczących Node.js oraz wykorzystasz ją w praktyce. **Pamiętaj żeby wykonywać dni challengu po kolei - od dnia pierwszego do ostatniego** (dzięki temu Twoja wiedza będzie poukładana i kompletna).

Każdy dzień to jeden temat przewodni. W jego ramach **stworzysz aplikację Node.js, która faktycznie będzie potrafiła coś zrobić** - od razu zobaczysz wynik swojej pracy.

___

> Kilka ważnych informacji

Przed przystąpieniem do rozwiązywania zadań przeczytaj poniższe wskazówki

**Do pełnego i satysfakcjonującego doświadczania tego challengu jest potrzebna znajomość JavaScript z elementami ES6.** Jeżeli potrzebujesz informacji z zakresu ES6 to znajdziesz je tutaj: [*tutorial ES6*][es6-tutorial].

## Jak zacząć?

1. Stwórz [*fork*][forking] repozytorium z zadaniami.
2. [*Sklonuj*][ref-clone] repozytorium na swój komputer.

Poszczególne zadania rozwiązuj w odpowiednich plikach.

## Plan challengu

* Pierwszy dzień to wstęp do Twojej przygody z Node.js - dowiesz się w jaki sposób przygotować środowisko oraz jak pisać i testować programy Node.js.
* W kolejnych dniach dowiesz się w jaki sposób za pomocą Node.js wchodzić w interakcję z systemem operacyjnym (np. modyfikować pliki czy dokonywać szyfrowania).
* Druga część challengu jest poświęcona tworzeniu back-endu - dowiesz się jak stworzyć własny serwer.
* Pod koniec doświadczysz roli full-stack developera - stworzysz komunikujący się ze sobą front-end i back-end.  

___

# Dzień 6: Full-stack?

> Więc mówisz, że chciałbyś być full-stack developerem?
> 
> Pozwól, że opowiem Ci pewną historię...

<img src="https://c1.staticflickr.com/5/4219/35263157061_b37daf97ce_b.jpg" alt="" width="500">

> Opowiem Ci jak łączyć front-end i back-end :)

Nauczymy się teraz przesyłać dane pomiędzy front-, a back-endem. Będziesz już gotowy do wykorzystania pełnej komunikacji. Jutro dowiesz się jak dodać do tego obsługę AJAX-a.

## Ciasteczka

Ciasteczka to małe pliki po stronie przeglądarki użytkownika. Mogą one przechowywać krótkie informacje tekstowe (może to być zwyczajny tekst, może być też JSON, ale w związku z ograniczeniami ciastek powinien być krótki).

Ich działanie jest następujące:

1. **Kiedy przeglądarka wykonuje zapytanie do serwera to przesyła mu wszystkie ciasteczka jakie są w przeglądarce dostępne dla tego serwera.** W większości przypadków przeglądarka przesyła ciastka, które zostały utworzone w tej samej domenie.
2. **Serwer w odpowiedzi, w nagłówkach, może powiedzieć przeglądarce by ta dodała, zmodyfikowała lub usunęła dane ciastko.**

Ciastka są więc przechowywane przez przeglądarkę. Do czego możesz chcieć je wykorzystać? Np. do śledzenia ile razy ktoś wszedł na stronę; do zapamiętania kto jest zalogowany; do przechowywania informacji podanych przez użytkownika itd.

### Ustawienie ciastek

Jak wspominamy wyżej, ustawienie ciastka to ustalenie pewnego nagłówka w odpowiedzi. Express dostarcza bardzo wygodną metodę, która za nas dodaje odpowiedni nagłówek. Używamy metody odpowiedzi, która w najprostszym wydaniu wygląda tak: `res.cookie(nazwaCiastka, wartoscCiastka)`. Przykład wykorzystania:

```JavaScript
// (...)

app.get('/cookie/set', (req, res) => {
    res.cookie('test', 'Hello, World'); //Ustawi ciastko "test" z zawartością "Hello, World" w przeglądarce użytkownika
    res.send('Ciastko ustawione!');
});

// (...)
```

**Ważna jest tutaj kolejność:** pamiętaj o zasadzie, że **najpierw pojawiają się nagłówki, a dopiero potem treść odpowiedzi**. Ponieważ ciastka są przesyłane w nagłówku, to najpierw używamy `res.cookie()`, a dopiero potem `res.send()`.

Ciastka stworzone w ten sposób to tzw. _ciastka sesyjne_ - tzn. po wyłączeniu przeglądarki/komputera znikną one. Co jeżeli chcemy, żeby nasze ciastko istniało dłużej niż tylko do wyłączenia? Można skorzystać z bardziej zaawansowanej formy `res.cookie(nazwaCiastka, wartoscCiastka, opcje)`. Opcje to obiekt, ma on różne możliwości. Dla nas najważniejsze będzie teraz ustawienie `maxAge`, które oznacza ile milisekund ma być przechowywane ciastko. Np. dla roku wpiszemy 31536000000 (1000(s) * 60(m) * 60(h) * 24(d) * 365(r)):

```JavaScript
// (...)

app.get('/cookie/set', (req, res) => {
    res.cookie('test', 'Hello, World', {
        maxAge : 31536000000,
    }); //Ustawi ciastko "test" z zawartością "Hello, World" w przeglądarce użytkownika na rok
    res.send('Ciastko ustawione!');
});

// (...)
```

W ten sposób ustawione ciastko pozostanie nawet po ponownym włączeniu przeglądarki/komputera - przez cały rok. Można to sprawdzić w zakładce **Application** w DevToolsach Chroma (uruchomiłem ten kod 23.01.18):

<img src="https://i.imgur.com/cBkyxL1.png" alt="Ciastko w DevToolsach Chroma" width="500">

### Modyfikowanie ciastek

Aby zmienić zawartość ciastka - po prostu wyślij kolejne z taką samą nazwą. Stare zostanie usunięte, a nadpisze je nowe.

### Usuwanie ciastek

Aby usunąć ciastko ręcznie możesz skorzystać z metody odpowiedzi `res.clearCookie(nazwaCiastka)`. Na przykład:

```JavaScript
// (...)

app.get('/cookie/remove', (req, res) => {
    res.clearCookie('test'); //Usunie ciastko "test"z przeglądarki użytkownika
    res.send('Ciastko usunięte!');
});

// (...)
```

### Odczyt ciastek

Wiemy już jak wysłać ciastko na komputer użytkownika. Teraz wypadałoby wiedzieć jakie ciastka już u niego są - czyli je odczytać. Aby Express mógł odpowiednio zinterpretować ciasteczka potrzebujemy tzw. parsera ciastek (dlatego, że są one przesyłane mało czytelnym sposobem). Polecanym i bardzo popularnym rozwiązaniem jest `cookie-parser`.

Aby z niego skorzystać użyjemy `npm`. W katalogu projektu linią komend/terminalem wykonujemy:

```cmd
npm install cookie-parser --save
```

Teraz aby wykorzystać nowy moduł `cookie-parser` oczywiście na początku go importujemy:

```JavaScript
const cookieParser = require('cookie-parser');
```

Następnie, tuż po stworzeniu aplikacji (po `const app =...`) mówimy Expressowi aby wykorzystał `cookie-parser`:

```JavaScript
const app = express();
app.use(cookieParser());
```

Od teraz w każdym zapytaniu (`req`) mamy dostęp do obiektu `res.cookies`, którego kluczami są nazwy ciastek. Np. aby odczytać wcześniej zapisane ciastko możemy wykorzystać taki kompletny przykład:

```JavaScript
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

app.get('/cookie/show', (req, res) => {
    const myCookie = req.cookies.test;
    res.send('Ciastko ma wartość: ' + myCookie); //Przeglądarka wyświetli "Ciastko ma wartość: Hello, World" - no chyba, że usunęliśmy ciastko :)
});

app.listen(3000, () => {
    console.log('Serwer uruchomiony na porcie 3000');
});
```


## Przesyłanie danych w formularzach

Przejdziemy teraz do przesyłania danych w drugą stronę: z przeglądarki użytkownika do back-endu. Na początek wykorzystamy najpopularniejszą metodę - formularze.

### HTML

Zacznijmy od poprawnego HTMLa. Oto przykład formularza przesyłającego wpisane przez użytkownika dane z front-endu do back-endu:

```HTML
<form action="/sciezka/w/backendzie" method="post">
    Imię: <input type="text" name="name"><br>
    Nazwisko: <input type="text" name="surname"><br>
    <button type="submit">Wyślij</button>
</form>
```

Zwróć uwagę na kilka ważnych rzeczy:

1. Należy elementowi `form` w atrybucie `action` podać ścieżkę, która będzie również zadeklarowana w aplikacji Express.
2. Należy elementowi `form` w atrybucie `method` podać małymi literami nazwę metody HTTP jaka ma się wykonać. Standardowo jest to `post`.
3. Bardzo ważne są atrybuty `name` w elementach `input` - to od nich zależy nazwa pod jaką konkretną informację odbierze back-end. Najlepiej stosować same małe litery.

### Moduł `body-parser`

Aby Express mógł odpowiednio zinterpretować przesłane dane potrzebujemy tzw. parsera ciała zapytania. Polecanym i bardzo popularnym rozwiązaniem jest `body-parser`.

Aby z niego skorzystać użyjemy `npm`. W katalogu projektu linią komend/terminalem wykonujemy:

```cmd
npm install body-parser --save
```

Teraz aby wykorzystać nowy moduł `body-parser` oczywiście na początku go importujemy:

```JavaScript
const bodyParser = require('body-parser');
```

Następnie, tuż po stworzeniu aplikacji (po `const app =...`) mówimy Expressowi aby wykorzystał `body-parser` i "rozpracowywał" kodowanie urlencoded (to sposób w jaki są przesyłane dane z prostego formularza):

```JavaScript
const app = express();
app.use(bodyParser.urlencoded());
```

### Odbieranie danych z formularza

Od teraz w każdym zapytaniu (`req`) mamy dostęp do obiektu `res.body`, którego kluczami są nazwy pól formularza. Np. aby odczytać wcześniej przesłane imię i nazwisko:

```JavaScript
// (...)

app.post('/sciezka/w/backendzie', (req, res) => {
    const {name, surname} = req.body; //Pamiętasz ten skrótowy zapis z ES6?
    res.send('Więc twierdzisz, że nazywasz się ' + name + ' ' + surname);
});

// (...)
```

# Ćwiczenia

> Ćwiczenia wykonuj w odpowiednich plikach. W folderze `app` są one ponumerowane tak samo jak poniżej - zadaniu `1. Rozgrzewka` odpowiada plik `app/zadanie01.js` itd.
> Aby uruchomić zadanie podaj jego nazwę (pamiętaj, aby linia komend/terminal był otwarty na katalogu `app` tego repozytorium), np.:
> ```cmd
> node ./zadanie01.js
> ```

> Pamiętaj, aby zainicjować npm i zainstalować wymagane moduły!

## 1: Dzielnik z formularza

Stwórz taką aplikację Express, która ma pliki statyczne serwowane ze ścieżki `'./public/zadanie01/'`. Na stronie głównej wyświetlaj formularz, w którym można podać dwie liczby.

Po wysłaniu formularza powinieneś sprawdzić czy liczba B jest dzielnikiem liczby A i wyświetlić odpowiednią informację w przeglądarce użytkownika.

> Pamiętaj, że dane z formularza są zwracane jako string. Potrzebujesz więc użyć np. `parseInt()`, żeby zmienić je w liczby.

## 2. Imię, imię, imię...

Stwórz taką aplikację Express, która ma pliki statyczne serwowane ze ścieżki `'./public/zadanie02/'`. Na stronie głównej wyświetlaj formularz, w którym można podać imię.

Oprócz tego w aplikacji mają być 3 ścieżki:

- `'/cookie/set'` - tu przesyłany jest formularz; zapamiętuje ona w ciasteczku podane imię i wyświetla "Zapisano imię." Niech imię będzie zapamiętywane nawet po restarcie przeglądarki i Twojej aplikacji - na min. miesiąc.
- `'/cookie/show'` - wyświetla ona wcześniej zapamiętane imię.
- `'/cookie/check'` - wyświetla ona informację, czy imię zostało już zapisane w ciastku czy nie. 

> Podpowiedź: jeżeli nie ma ciastka to odczytasz go jako `undefined`.

## Zadanie dnia: Forum

Stwórz aplikację Express, która będzie prostym jednowątkowym forum dyskusyjnym. Powinna ona serwować statyczne pliki ze ścieżki `'./public/zadanieDnia/'`.

Statyczny plik powinien nazywać się `add.html` i zawierać taki formularz, który ma jedno pole `textarea` - z treścią komentarza. Formularz powinien kierować do ścieżki `/save`.

Ścieżka `/save` powinna dodawać komentarz do listy już dodanych komentarzy (przechowywaną w ciastku!) i wyświetlać link do powrotu na stronę główną.

Ścieżka `/` (strona główna) powinna wyświetlić wszystkie dodane komentarze.

> To zadanie wymaga przemyślanego od początku podejścia.
>
> W ciastku przechowuj tablicę za pomocą metody `JSON.stringify(tablica)`, a odczytuj ją za pomocą `JSON.parse(tekst)`.
>
> Pamiętaj, żeby sprawdzić czy wcześniej ciastko istniało.

> Jeżeli chcesz podpowiedzi to skorzystaj z pliku `app/zadanieDniaZPodpowiedzia.js` - znajdziesz tam pomocnicze, opisane funkcje.

> PS. Oczywiście takie podejście ma swoje wady. Spróbuj np. dodać dużo długich komentarzy - widzisz problemy? W praktyce tego typu dane przechowujemy na back-endzie - to zrobimy już jutro.

**To wszystko na dziś - gratulacje! Do jutra :)**


<!-- Links -->
[forking]: https://guides.github.com/activities/forking/
[ref-clone]: http://gitref.org/creating/#clone
[es6-tutorial]: http://qnimate.com/post-series/ecmascript-6-complete-tutorial/
[download-node]: https://nodejs.org/en/download/
[localhost]: http://localhost:3000
[localhost127]: http://127.0.0.1:3000
[httpcats]: http://http.cat/
[httpdogs]: https://httpstatusdogs.com/