BEGIN;

DROP TABLE IF EXISTS "item", "category";


CREATE TABLE "category" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT
);


CREATE TABLE "item" (
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "expirationdate" DATE,
    "quantity" INTEGER,
    "quantitypackage" INTEGER,
    "category_id" INTEGER NOT NULL REFERENCES category("id")
);



INSERT INTO "category" ("name")
    VALUES
        ('viande');
        
INSERT INTO "item" ("name", "expirationdate", "quantity", "quantitypackage", "category_id")
    VALUES
        ('Steack', '12/05/2020', 1 , 6 , 1);






COMMIT;