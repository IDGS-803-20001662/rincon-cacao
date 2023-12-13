from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import logging
import time
import requests
from requests.exceptions import RequestException

# Configuración del logger
logging.basicConfig(filename='resultados_funcionalidad_log.txt', level=logging.INFO,
                    format='%(asctime)s - %(levelname)s: %(message)s')

def run_test():
    driver = webdriver.Chrome()
    
    try:
        # Inicio del contador
        start_time = time.time()
        
        # Abrir la página web
        driver.get('http://localhost:5173/')
        
        test_iniciar_sesion(driver)
        
        test_insertar_registro(driver)
        
        # Calcular el tiempo transcurrido desde el inicio de carga
        elapsed_time = time.time() - start_time
        
        print("La prueba de funcionalidad fue exitosa")
        logging.info(f'La pagina completo la prueba de funcionalidad con una tiempo de {elapsed_time} segundos.')
        
    except Exception as e:
        print("La prueba de funcionalidad falló:", str(e))
        logging.error(f'La prueba de funcionalidad falló: {e}')
        
    finally:
        # Cerrar el navegador
        driver.quit()
    

def test_iniciar_sesion(driver):
    try:
        
        # localizar los elementos de usuario y contraseña
        usuario = driver.find_element(By.ID, 'txtEmailLogin')
        contrasenia = driver.find_element(By.ID, 'txtContrasenniaLogin')
        boton_login = driver.find_element(By.ID, 'btnLogin')
        
        # Introducir las credenciales 
        usuario.send_keys('citla@gmail.com')
        contrasenia.send_keys('123')
        
        # Hacer clic en login
        boton_login.click()
        
        # Esperar que el elemento esté presente
        bienvenido_header = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, 'titleBienvenido'))
        )
        
        # Verificar si se ha iniciado la sesión correctamente
        if bienvenido_header:
            print("El inicio de sesión fue exitoso.")
            
        else:
            print("El inicio de sesión ha fallado.")
            logging.error("La prueba no paso: El inicio de sesión ha fallado.")
    
    except Exception as e:
        print("La prueba de login falló:", str(e))
        logging.error(f'Error en la prueba de login: {e}')
        

def test_insertar_registro(driver):
    try:
        
        # Navegar a la página de usuarios
        boton_usuarios = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, 'liUsuarios'))
        )
        boton_usuarios.click()
        
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, 'titleUsuario'))
        )
        
        # Abrir el formulario de insertar un nuevo usuario
        boton_nuevo_usuario = driver.find_element(By.ID, 'btnAgregarUsuario')
        boton_nuevo_usuario.click()
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, 'titleAgregarUsuario'))
        )
        
        # Agregar nuevo registro
        nombre = driver.find_element(By.ID, 'txtNombreAU')
        apellido_paterno = driver.find_element(By.ID, 'txtApellidoPAU')
        apellido_materno = driver.find_element(By.ID, 'txtApellidoMAU')
        domicilio = driver.find_element(By.ID, 'txtDomicilioAU')
        fecha_nacimiento = driver.find_element(By.ID, 'txtFechaNacimientoAU')
        acontrasennia = driver.find_element(By.ID, 'txtContrasenniaAU')
        telefono = driver.find_element(By.ID, 'txtTelefonoAU')
        aemail = driver.find_element(By.ID, 'txtEmailAU')
        rfc = driver.find_element(By.ID, 'txtRfcAU')
        
        boton_guardar = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, 'btnAgregarUsuarioA'))
        )
        time.sleep(2)
        
        nombre.send_keys('USUARIO')
        apellido_paterno.send_keys('PRUEBA')
        apellido_materno.send_keys('PRUEBA')
        domicilio.send_keys('PRUEBA')
        fecha_nacimiento.send_keys('01-01-2000')
        acontrasennia.send_keys('123')
        telefono.send_keys('1234567891')
        aemail.send_keys('usuarioprueba@gmail.com')
        rfc.send_keys('1234567891234')
        
        boton_guardar.click()
        
        # Confirmar inserción
        input_buscar = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "txtBuscarU"))
        )
        
        input_buscar.send_keys('PRUEBA')
        
        registro = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "tr"))
        )
        
        if(registro):
            print("La inserción fue exitosa.")
            
            ## ELIMINAR
            last_register = driver.find_element(By.ID, 'txtLastID')
            last_id = last_register.get_attribute('value')
            
            url = "http://localhost:3001/usuarios/eliminate"
            try: 
                response = requests.delete(url, json = {"id": last_id})
                
                if response.status_code == 200:
                    print("Usuario de prueba eliminado")
                else:
                    print("Fallo al eliminar el usuario")
                    
            except RequestException:
                print("Fallo al eliminar el usuario desde la petición")
                
            
            # Navegar a la página de inicio
            boton_inicio = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.ID, 'liInicio'))
            )
            boton_inicio.click()
            
        else:
            print("La inserción falló.")
            logging.error("La prueba no paso: La inserción ha fallado.")
        
        
    except Exception as e:
        print("La prueba de inserción falló:", str(e))
        logging.error(f'Error en la prueba de inserción: {e}')
        
        
# CONFIGURACION DE LA PRUEBA
for i in range(5):
    print("")
    print(f'------------ PRUEBA NÚMERO {i+1}---------------------')
    run_test()
    
    if i < 4:
        time.sleep(2)