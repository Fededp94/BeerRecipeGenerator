CREATE TABLE "Recipe"(
    "id" SERIAL NOT NULL,
    "utente_id" INTEGER NOT NULL,
    "titolo" VARCHAR(255) NOT NULL,
    "ingredienti" VARCHAR(255) NOT NULL,
    "data_creazione" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "Recipe" ADD PRIMARY KEY("id");
CREATE TABLE "User"(
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "cognome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "data_creazione" TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE
    "User" ADD PRIMARY KEY("id");
ALTER TABLE
    "User" ADD CONSTRAINT "user_id_foreign" FOREIGN KEY("id") REFERENCES "Recipe"("id");