from flask import Flask, jsonify, render_template, request, redirect, url_for, session, flash, Response
from database import db
from flask_cors import CORS, cross_origin
app = Flask(__name__)
app.secret_key = 'secret'
CORS(app)

# user login and logout functions
@app.route('/register', methods=['POST'])
@cross_origin()
def register():
    data = request.get_json()
    name = data['name']
    email = data['email']
    # cpassword=data['cpassword']
    password = data['password']
    # phonenumber=data['phonenumber']
    # if(password!=cpassword):

    #     return Response("{'message':'Password and confirm password are not same'}", status=422, mimetype='application/json')
       
    db.register(name, email, password)
    user={
        'name':data['name'],
        'email':data['email']
    }
    return jsonify({'message': 'User added successfully','user':user})


@app.route('/login', methods=['POST'])
@cross_origin()
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']
    loginresult = db.login(email, password)
    return loginresult




@app.route('/logout')
@cross_origin()
def logout():
    session.clear()
    return jsonify({'message': 'Logged out successfully'})


# adding details to users
@app.route('/becomeadonor', methods=['POST'])
@cross_origin()
def adduserdetails():
    # if((session.get('role')!=) or session['role'].strip()!='admin'):
    #         return jsonify({'message': 'You are not authorized to perform this action'})
    data = request.get_json()
    
   
    
    address = data['address']
    city = data['city']
    state = data['state']
    email=data['email']

    role = "donor"
    donorstatus="pending"
    bloodgroup=data['bloodgroup']
    res=db.adduserDetails(address, city, state, role,bloodgroup,donorstatus,email)
    return res

# get current user
@app.route('/getuser')
@cross_origin()
def getuser():
    email = session['email']
    user = db.getuser(email)
    return jsonify({'user': user})


# filtering using locations
@app.route('/filterusinglocation')
@cross_origin()
def filterLocation():
    data = request.get_json()
    city = data['city']
    users = db.filterLocation(city)
    return jsonify({'users': users})

# filtering using role
@app.route('/filterbypreferance')
@cross_origin()
def filterRoleuser():
    data = request.get_json()
    role = data["role"]
    users = db.filterRole(role)
    return jsonify({'users': users})


#posting a plasma request
@app.route('/getplasma', methods=['POST'])
@cross_origin()
def getPlasma():
    # if session['logged_in'] == True:
        data = request.get_json()
        bloodgroup = data['bloodgroup']
        units = data['units']
        state = data['state']
        city = data['city']
        users= db.getplasma(bloodgroup, units,state,city)
        return jsonify({'message': 'Plasma Request Posted Successfully','users':users})

# admin privileges
@app.route('/admin/alldonors')
@cross_origin()
def getapproveddonor():
    
        users = db.getapproveddonor()
        
        return jsonify({'users': users})

@app.route('/admin/getallusers')
@cross_origin()
def getallusers():
    
        users = db.getallusers()
        
        return jsonify({'users': users})


# @app.route('/admin/allrequest')
# def allrequest():
#     if session['logged_in'] == True:
#         requests=db.allrequest()


@app.route('/admin/approverequest',methods=['POST'])
@cross_origin()
def approverequest():
    # if session['logged_in'] == True:
        data=request.get_json()
    #     if((session.get('role')==None) or session['role'].strip()!='admin'):
    #         return jsonify({'message': 'You are not authorized to perform this action'})

        
        email=data['email']
        status=data['status']
        
        db.approverequest(email,status)
        
        return jsonify({'message':'Request processed Successfully'})



if __name__ == '__main__':
    app.run(debug=True)
