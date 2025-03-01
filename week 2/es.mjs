import dayjs from "dayjs";

function Answer(text, username, score, date) {
    this.text = text;
    this.username = username;
    this.score = score;
    this.date = dayjs(date);

    this.toString = () => `User ${this.username} replied "${this.text}" on ${this.date.format('DD MMM, YYYY')} and got a score of ${this.score}`;
}

function Question(text, username, date) {
    this.text = text;
    this.username = username;
    this.date = dayjs(date);
    this.answers = [];

    this.addAnswer = (answer) => {
        this.answers.push(answer);
    }

    this.find = (username) => {
        return this.answers.filter(ans => ans.username === username);
    }

    this.afterDate = (date) => {
        return this.answers.filter(ans => ans.date.isAfter(dayjs(date)));
    }

    this.listByDate = () => {
        return [...this.answers].sort((a, b) => a.date.isAfter(b.date) ? 1 : -1);
    }

    this.listByScore = () => {
        return [...this.answers].sort((a, b) => b.score - a.score);
    }
}

function main() {
    const q = new Question('How to learn JS?', 'John', '2021-09-01');
    q.addAnswer(new Answer('Just practice', 'Alice', 10, '2021-09-02'));
    q.addAnswer(new Answer('Read the docs', 'Bob', -1, '2021-09-03'));
    q.addAnswer(new Answer('Watch tutorials', 'Alice', -8, '2021-09-04'));
    q.addAnswer(new Answer('By doing exercises', 'Charlie', 7, '2021-09-05'));

    q.find('Alice').forEach(ans => console.log(ans.toString()));
    console.log('------------------------------------------------------------------------------');

    q.afterDate('2021-09-03').forEach(ans => console.log(ans.toString()));
    console.log('------------------------------------------------------------------------------');

    q.listByDate().forEach(ans => console.log(ans.toString()));
    console.log('------------------------------------------------------------------------------');

    q.listByScore().forEach(ans => console.log(ans.toString()));
}

main();