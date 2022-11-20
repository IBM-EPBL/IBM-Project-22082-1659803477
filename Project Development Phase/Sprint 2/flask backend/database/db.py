import ibm_db
import func


try:
    conn = ibm_db.connect("DATABASE=bludb;HOSTNAME=125f9f61-9715-46f9-9399-c8177b21803b.c1ogj3sd0tgtu0lqde00.databases.appdomain.cloud;PORT=30426;Security=SSL;SSLServerCertificate=DigiCertGlobalRootCA.crt;UID=nsb99007;PWD=3DxQRKiHjSfHe84r;", "", "")
    print('Connected to Database')
except:
    print("Connection failed")


def register(name, email,  password):
    func.register(name, email,  password, conn)


def login(email, password):
    loginresult = func.login(email, password, conn)
    return loginresult


def adduserDetails(address, city, state, role, bloodgroup, donorstatus, email):
    result = func.addUserDetailsfunc(
        address, city, state, role, bloodgroup, donorstatus, email, conn)
    return result


def getuser(email):
    user = func.getUserDetails(conn)
    return user


def filterLocation(city):
    user = func.filterUsingLocation(city, conn)
    return user


def filterRole(role):
    user = func.filterUsingRole(role, conn)
    return user


def getplasma(bloodgroup, unitrequired, state, city):
    user = func.getPlasma(bloodgroup, unitrequired, state, city, conn)
    return user

# admin privilages


def getapproveddonor():
    user = func.getapproveddonor(conn)
    return user


def getallusers():
    user = func.getallusers(conn)
    return user


def approverequest(email, status):
    func.approveRequest(email, status, conn)
