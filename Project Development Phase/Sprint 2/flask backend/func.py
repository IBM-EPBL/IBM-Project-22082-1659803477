import ibm_db
from flask import Flask, request, jsonify, session , Response


# register function
def register(name, email, password, conn):
    sql = "INSERT INTO PDAUSERS(name,email,password,role) VALUES (?, ?, ?,?)"
    stmt = ibm_db.prepare(conn, sql)
    ibm_db.bind_param(stmt, 1, name)
    ibm_db.bind_param(stmt, 2, email)
    ibm_db.bind_param(stmt, 3, password)
    ibm_db.bind_param(stmt, 4, 'user')
    ibm_db.execute(stmt)


# login function
def login(email, password, conn):
    sql = "select * from pdausers where email=?"
    stmt = ibm_db.prepare(conn, sql)
    ibm_db.bind_param(stmt, 1, email)
    ibm_db.execute(stmt)
    res = ibm_db.fetch_assoc(stmt)
    if res:
        if res['PASSWORD'] == password:
            session['email'] = email
            session['name'] = res['NAME']
            session['role']= res['ROLE']
            session['donorstatus']=res['DONORSTATUS']
            session['logged_in'] = True
            data={'name':res['NAME'],
            'city':res['CITY'],
            'role':res['ROLE'],
            'donorstatus':res['DONORSTATUS'],
            'email':email,
            'state':res['STATE'],
            'bloodgroup':res['BLOODGROUP']
            }
  

            return jsonify({'message': 'Login Successful','user':data})
        else:
            return jsonify({'message': 'Incorrect Password'})
    else:
        return Response("{'message':'invalid credintials'}", status=422, mimetype='application/json')
       

# adding user details function


def addUserDetailsfunc(address, city, state, role, bloodgroup, donorstatus, email,  conn):
    # sql = "INSERT INTO PDAUSERS(address, city, state) VALUES (?, ?, ?)"

    sql = "select * from pdausers where email=?"
    stmt = ibm_db.prepare(conn, sql)
    ibm_db.bind_param(stmt, 1, email)
    ibm_db.execute(stmt)
    res = ibm_db.fetch_assoc(stmt)

    if(res['ROLE']=='donor'):
         return jsonify({'message': 'You have made previous request'})
      




    sql = "UPDATE pdausers SET address = ?, city = ? , state = ? , role=? , bloodgroup=? , donorstatus=? WHERE email = ?"
    stmt = ibm_db.prepare(conn, sql)
    ibm_db.bind_param(stmt, 1, address)
    ibm_db.bind_param(stmt, 2, city)
    ibm_db.bind_param(stmt, 3, state)
    ibm_db.bind_param(stmt, 4, role)
    ibm_db.bind_param(stmt, 5, bloodgroup)
    ibm_db.bind_param(stmt, 6, donorstatus)
    
    ibm_db.bind_param(stmt, 7, email)
    ibm_db.execute(stmt)
    return jsonify({'message': "details added succesfully, Wait for the Admin Approval"})

# getting current user


def getUserDetails(conn):
    sql = "select * from pdausers where email=?"
    stmt = ibm_db.prepare(conn, sql)
    ibm_db.bind_param(stmt, 1, session['email'])
    ibm_db.execute(stmt)
    res = ibm_db.fetch_assoc(stmt)
    return res


# filtering using location


def filterUsingLocation(city, conn):
    sql = "select * from pdausers where city=?"
    stmt = ibm_db.prepare(conn, sql)
    ibm_db.bind_param(stmt, 1, city)
    ibm_db.execute(stmt)
    user = ibm_db.fetch_assoc(stmt)
    res = []
    while user:
        res.append(user)
        user = ibm_db.fetch_assoc(stmt)
    return res



# filtering using roles
def filterUsingRole(role, conn):
    sql = "select * from pdausers where role=?"
    stmt = ibm_db.prepare(conn, sql)
    ibm_db.bind_param(stmt, 1, role)
    ibm_db.execute(stmt)
    user = ibm_db.fetch_assoc(stmt)
    res = []
    while user:
        res.append(user)
        user = ibm_db.fetch_assoc(stmt)
    return res


# post a plasma request
def getPlasma(bloodgroup, unitrequired, state , city ,  conn):
    sql = "select * from pdausers WHERE bloodgroup=? AND city=? AND DONORSTATUS='approved' "
    stmt = ibm_db.prepare(conn, sql)
    ibm_db.bind_param(stmt, 1, bloodgroup)
    ibm_db.bind_param(stmt, 2, city)
    ibm_db.execute(stmt)
    user = ibm_db.fetch_assoc(stmt)
    res = []
    while user:
        res.append(user)
        user = ibm_db.fetch_assoc(stmt)
    return res


# admin privileges
def getapproveddonor(conn):
    sql = "select * from pdausers WHERE DONORSTATUS = 'approved'"
    stmt = ibm_db.prepare(conn, sql)
    ibm_db.execute(stmt)
    res = ibm_db.fetch_assoc(stmt)
    users = []
    while res:
        users.append(res)
        res = ibm_db.fetch_assoc(stmt)
    return users


def getallusers(conn):
    sql = "select * from pdausers WHERE ROLE != 'admin'"
    stmt = ibm_db.prepare(conn, sql)
    ibm_db.execute(stmt)
    res = ibm_db.fetch_assoc(stmt)
    users = []
    while res:
        data={'name':res['NAME'],
            'city':res['CITY'],
            'role':res['ROLE'],
            'donorstatus':res['DONORSTATUS'],
            'bloodgroup':res['BLOODGROUP'],
            'state':res['STATE'],
            'city':res['CITY'],
            'email':res['EMAIL']
            }

        users.append(data)
        res = ibm_db.fetch_assoc(stmt)
    return users



def approveRequest(email,status,conn):
    sql="UPDATE pdausers SET  donorstatus=? WHERE email = ?"
    stmt = ibm_db.prepare(conn, sql)
    ibm_db.bind_param(stmt, 1, status)
    ibm_db.bind_param(stmt, 2, email)
    ibm_db.execute(stmt)