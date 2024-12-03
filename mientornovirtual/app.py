from flask import Flask, render_template, request, redirect, url_for, flash
from flask_mysqldb import MySQL

app=Flask(__name__)
# MySQL Connection
app.config['MYSQL_HOST']= 'localhost'
app.config['MYSQL_USER']= 'root'
app.config['MYSQL_PASSWORD']= '12345'
app.config['MYSQL_DB']= 'db_universo_flask'

mysql = MySQL(app)

# settings
app.secret_key = 'mysecretkey'

@app.route('/') 
def Registro():
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM prospectos')
    data = cur.fetchall()
    return render_template('Registro.html', prospectos = data)

@app.route('/add_prospecto', methods=['POST'])
def add_prospecto():
    if request.method == 'POST':
        nombre = request.form['nombre']
        apellido = request.form['apellido']
        email = request.form['email']
        fecha_nac = request.form['fecha_nac']
        cur=mysql.connection.cursor()
        cur.execute('INSERT INTO prospectos (nombre, apellido, email, fecha_nac) VALUES(%s, %s, %s, %s)',(nombre, apellido, email, fecha_nac))
        mysql.connection.commit()
        #flash('Prospecto agregado')
        return redirect(url_for('Registro'))
    
@app.route('/edit/<id>')
def get_prospecto(id):
    cur = mysql.connection.cursor()
    cur.execute('SELECT * FROM prospectos WHERE id = %s', (id))
    data = cur.fetchall()
    print(data[0])
    return render_template('crud_universo.html', prospecto = data[0])

@app.route('/update/<id>', methods = ['POST'])
def update_prospecto(id):
    if request.method == 'POST':
        nombre = request.form['nombre']
        apellido = request.form['apellido']
        email = request.form['email']
        fecha_nac = request.form['fecha_nac']
    cur = mysql.connection.cursor()
    cur.execute("""
    UPDATE prospectos
        SET nombre = %s,
            apellido = %s,
            email = %s,
            fecha_nac = %s
    WHERE id = %s
    """, (nombre, apellido, email, fecha_nac, id))
    mysql.connection.commit()
    flash ('Prospecto actualizado')
    return redirect(url_for('Registro.html'))

@app.route('/delete/<string:id>')
def delete_prospecto(id):
    cur = mysql.connection.cursor()
    cur.execute('DELETE FROM prospectos WHERE id = {0}' .format(id))
    mysql.connection.commit()
    flash ('Contacto Borrado')
    return redirect(url_for('crud_universo.html'))


if __name__=='__main__':
    app.run(port=5500, debug=True)