var sql = require('mssql'),
    connectionPool = require('./mssql-connection'),
    transaction = require('./mssql-transaction');

function initialize(dbConnect) {
    var databaseConnection = connectionPool(dbConnect);

    return {
        connection: databaseConnection,
        transaction: () => {
            return transaction(databaseConnection);
        },
        request: (conn) => {
            if (!conn && global.conexao)
                return new sql.Request(global.conexao);

            return (conn instanceof sql.Transaction ? conn.request() : new sql.Request(conn || databaseConnection));
        },
		types: {
			Bit: sql.Bit,
			BigInt: sql.BigInt,
			Decimal: sql.Decimal,
			Float: sql.Float,
			Int: sql.Int,
			Money: sql.Money,
			Numeric: sql.Numeric,
			SmallInt: sql.SmallInt,
			SmallMoney: sql.SmallMoney,
			Real: sql.Real,
			TinyInt: sql.TinyInt,
			Char: sql.Char,
			NChar: sql.NChar,
			Text: sql.Text,
			NText: sql.NText,
			VarChar: sql.VarChar,
			NVarChar: sql.NVarChar,
			Xml: sql.Xml,
			Time: sql.Time,
			Date: sql.Date,
			DateTime: sql.DateTime,
			DateTime2: sql.DateTime2,
			DateTimeOffset: sql.DateTimeOffset,
			SmallDateTime: sql.SmallDateTime,
			UniqueIdentifier: sql.UniqueIdentifier,
			Variant: sql.Variant,
			Binary: sql.Binary,
			VarBinary: sql.VarBinary,
			Image: sql.Image,
			UDT: sql.UDT,
			Geography: sql.Geography,
			Geometry: sql.Geometry
		},
		execute: sqlExecute
    }
}

//sempre informe conexão e callback ou callback (nessa ordem).
//always pass connection and callback or only callback (in this order).
function sqlExecute(procName, parameters) {
	var sqlService = this;
	var command = sqlService.request(arguments.length == 4 ? arguments[2] : undefined);

	for (var i in parameters)
		command.input(i, parameters[i]);

	command.execute(procName, arguments.length == 3 ? arguments[2] : arguments[3]);
}

module.exports = initialize;