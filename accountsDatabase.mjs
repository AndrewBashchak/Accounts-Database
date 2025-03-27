import prompt from 'prompt';
import pg from 'pg';

const { Client } = pg;
const client = new Client({
    connectionString: 'postgresql://neondb_owner:npg_0pgwJMCOrht1@ep-frosty-fire-a94nhe0n-pooler.gwc.azure.neon.tech/neondb?sslmode=require'
});

async function getDataFromDB() {
    const { rows } = await client.query('Select * from students');

    console.log(rows)
}

async function insertDataIntoDB(data) {
    const queryText = 'INSERT INTO students(first_name, last_name, email, phone_number, mark) VALUES($1, $2, $3, $4, $5)'
    const res = await client.query(queryText, [data.first_name, data.last_name, data.email, data.phone_number, data.mark])

    console.log(res)
}

async function getDataFromConsole() {
    prompt.start();

    const { first_name, last_name, email, phone_number, mark } = await prompt.get(["first_name", "last_name", "email", "phone_number", "mark"]);

    return {
        first_name,
        last_name,
        email,
        phone_number,
        mark,
    };
}

// Use only one part of the code

// (Part 1) Entering new user into the database

// async function main() {
//     await client.connect();

//     const userData = await getDataFromConsole();

//     await insertDataIntoDB(userData);

//     console.log('User has added successfully!');

//     await client.end();
// }

// End of part 1

// (Part 2) Viewing users

async function main() {
    await client.connect()
    await getDataFromDB();
    await client.end();

    return;
}

// End of part 2

main()
