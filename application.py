from flask import Flask, render_template, redirect, url_for, request, flash
from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)
app.secret_key = 'SECRET'


app.config ['SQLALCHEMY_DATABASE_URI']=('mysql+pymysql://root:12345@localhost:3308/geek_synergy')

db=SQLAlchemy(app)

class user(db.Model):
    iduser = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    user_name = db.Column(db.String(99),nullable=False, unique= True)
    phone_num = db.Column(db.String(10),nullable=False, unique=True)
    email_addr = db.Column(db.String(99),nullable=False,unique=True)
    passwd = db.Column(db.String(20),nullable=False)
    user_profession = db.Column(db.String(99), nullable=False)

db.create_all()

@app.route('/login', methods=['POST','GET'])
def login():
    message = None
    if request.method == 'GET':
        return render_template('login.html')
    elif request.method == 'POST':
        name = request.form['name']
        password = request.form['password']
        if(name == '' or password == ''):
            error = """One or more fields are empty!"""
            return render_template('login.html', message = message)
        login_user = user.query.filter_by(user_name = name).first()
        if(login_user is None):
            message = """User does not exist!"""
            return render_template('login.html', message = message)
        elif(login_user.passwd != password):
            message = """Incorrect password!"""
            return render_template('login.html',message = message)
        else:
            message = """Successfully logged in!"""
            return redirect(url_for('home'))
        
    


@app.route('/signup', methods=['POST','GET'])
def signup():
    message = None
    if request.method == 'GET':
        return render_template('signup.html')
    elif request.method == 'POST':
        name = request.form['name']
        phone = request.form['phone']
        email = request.form['email']
        password = request.form['password']
        profession = request.form['profession']
        if(name == '' or phone =='' or email == '' or password == '' or profession == ''):
            error = """One or more fields are empty!"""
            return render_template('signup.html', message = message)
        elif(user.query.filter_by(user_name = name).first() is not None):
            error = """A user with this Name is already registered!"""
            return render_template('signup.html',message = message)
        elif(user.query.filter_by(phone_num = phone).first() is not None):
            error = """A user with this Phone number is already registered!"""
            return render_template('signup.html',message = message)
        elif(user.query.filter_by(email_addr = email).first() is not None):
            error = """A user with this Email address is already registered!"""
            return render_template('signup.html',message = message)
        else:
            new_user = user(
                         user_name = name,
                         phone_num = phone,
                         email_addr = email,
                         passwd = password,
                         user_profession = profession
                         )
            db.session.add(new_user)
            db.session.commit()
            flash("""User has been created!""")
            return redirect(url_for('login',message=message))

@app.route('/info')
def info():
    return render_template('info.html')

@app.route('/home')
def home():
    return render_template('home.html')
        
if __name__ =='__main__':
    app.run()
    


