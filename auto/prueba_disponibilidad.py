from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import logging
import time

# Configuración del logger
logging.basicConfig(filename='resultados_disponibilidad_log.txt', level=logging.INFO,
                    format='%(asctime)s - %(levelname)s: %(message)s')


def run_test():
    driver = webdriver.Chrome()
    
    try:
         # Inicio del contador
        start_time = time.time()
        
        # Abrir la página web
        driver.get('http://localhost:5173/')
        
        # Calcular el tiempo transcurrido desde el inicio de carga
        elapsed_time = time.time() - start_time
        
        test_elementos_presentes(driver)
        
        test_iniciar_sesion(driver)
        
        logging.info(f'La pagina completo la prueba de disponibilidad con una carga del sitio en {elapsed_time} segundos.')
    
    except Exception as e:
        print("La prueba de disponibilidad falló:", str(e))
        logging.error(f'La prueba de disponibilidad falló: {e}')
        
    finally:
        # Cerrar el navegador
        driver.quit()
        

def test_elementos_presentes(driver):
    try:
        
        # Esperar que el elemento esté presente
        login_header = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, 'titleIniciarSesion'))
        )
        
        # Verificar si el elemento está presente
        if login_header:
            print("El header de login está presente en la página.")
            
        else:
            print("El header de login no está presente en la página.")
            logging.error("La prueba no paso: El header de login no esta presente en la pagina.")
        
    except Exception as e:
        print("La prueba de elementos presentes falló:", str(e))
        logging.error(f'Error en la prueba de elementos presentes: {e}')


      
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
        

# CONFIGURACION DE LA PRUEBA
for i in range(5):
    print("")
    print(f'------------ PRUEBA NÚMERO {i+1}---------------------')
    run_test()
    
    if i < 4:
        time.sleep(2)