##DEVBOX-SQL

Gerenciar conexão com sql, usuando mssql.

- const sql = require('devbox-box')('Objeto configurações de conexão com banco');

## Chamada sem transação
```
sql.request()
    .input('Parametro', sql.types.Int, valorParametro)
    .execute(...);

```

## Chamada com transação
```
let transaction = sql.transaction();

transaction.begin(...);

sql.request(transaction)
    .input('Parametro', sql.types.Int, valorParametro)
    .execute(...);

sql.request(transaction)
    .input('Parametro', sql.types.Int, valorParametro)
    .execute(...);

transaction.rollback(...);
transaction.commit(...);

```