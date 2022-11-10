import ibm_db

try:
    
    conn = ibm_db.connect("DATABASE=bludb;HOSTNAME=125f9f61-9715-46f9-9399-c8177b21803b.c1ogj3sd0tgtu0lqde00.databases.appdomain.cloud;PORT=30426;PROTOCOL=TCPIP;UID=nsb99007;PWD=3DxQRKiHjSfHe84r;Security=SSL;SSLSecurityCertificate=DigiCertGlobalRootCA.crt", "", "")
    print("Connected to the database")
except:
    print("Error in connecting to the database: ", ibm_db.conn_errormsg())


def register(name, email, rollno, password):
    insert_sql = "INSERT INTO  nsb99007.USERS VALUES (?, ?, ?, ?)"
    prep_stmt = ibm_db.prepare(conn, insert_sql)
    ibm_db.bind_param(prep_stmt, 1, name)
    ibm_db.bind_param(prep_stmt, 2, email)
    ibm_db.bind_param(prep_stmt, 3, rollno)
    ibm_db.bind_param(prep_stmt, 4, password)
    ibm_db.execute(prep_stmt)


def login(name, password):
    select_sql = "SELECT * FROM  nsb99007.USERS WHERE NAME = ? AND PASSWORD = ?"
    prep_stmt = ibm_db.prepare(conn, select_sql)
    ibm_db.bind_param(prep_stmt, 1, name)
    ibm_db.bind_param(prep_stmt, 2, password)
    out = ibm_db.execute(prep_stmt)
    result_dict = ibm_db.fetch_assoc(prep_stmt)
    print(result_dict)
    return result_dict
