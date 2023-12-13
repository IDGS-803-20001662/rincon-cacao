from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import logging
import time
import requests
from requests.exceptions import RequestException

# Configuración del logger
logging.basicConfig(filename='resultados_rendimiento_log.txt', level=logging.INFO,
                    format='%(asctime)s - %(levelname)s: %(message)s')


def run_test():
    driver = webdriver.Chrome()
    servicios_disponibles = True
    
    try:
         # Inicio del contador
        start_time = time.time()
        
        servicios_disponibles = revisarServicios(driver)
        
        if (servicios_disponibles == False):
            logging.error(f'La prueba de disponibilidad fallo: Los servicios no estan disponibles')
            return False
        
        # Abrir la página web
        driver.get('http://localhost:5173/')
        
        test_iniciar_sesion(driver)
        
        test_obtener_compras(driver)
        
        # Calcular el tiempo transcurrido desde el inicio de carga
        elapsed_time = time.time() - start_time
        
        logging.info(f'La pagina completo la prueba de rendimiento con una carga del sitio en {elapsed_time} segundos.')
    
    except Exception as e:
        print("La prueba de rendimiento falló:", str(e))
        logging.error(f'La prueba de disponibilidad fallo: {e}')
        servicios_disponibles = False
        
    finally:
        # Cerrar el navegador
        driver.quit()
        return servicios_disponibles
        
 
def revisarServicios(driver):
    servicios_funcionando = True
    
    try:
        ## SERVIDOR
        response = requests.get('http://localhost:3001/proveedores')
        
        if response.status_code == 200:
            print("El servicio http://localhost:3001 está disponible")
            servicios_funcionando = True
        else:
            print("El servicio http://localhost:3001 no está disponible")
            servicios_funcionando = False
        
        
        ## CLIENTE
        driver.get('http://localhost:5173/')
        
        # Esperar que el elemento esté presente
        login_header = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, 'titleIniciarSesion'))
        )
        
        # Verificar si el elemento está presente
        if login_header:
            servicios_funcionando = True
            
        else:
            servicios_funcionando = False
            
        return servicios_funcionando
        
    except requests.RequestException as e:
        print(f"Se produjo un error al conectarse a la API: {str(e)}")
        return False
 
        
                   
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
        


def test_obtener_compras(driver):
    try:
        
        # Navegar a la página de compras
        boton_compras = WebDriverWait(driver, 10).until(
            EC.element_to_be_clickable((By.ID, 'liCompras'))
        )
        boton_compras.click()
        
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, 'titleCompra'))
        )
        
        registros = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.CSS_SELECTOR, "tr"))
        )
        
        if(registros):
            print("Obtencion de registro de compras exitoso")
        else:
            print("La prueba de obtención de registros falló")
        
    except Exception as e:
        print("La prueba de listar falló:", str(e))
        logging.error(f'Error en la prueba de listar: {e}')
    

# CONFIGURACION DE LA PRUEBA
for i in range(5):
    print("")
    print(f'------------ PRUEBA NÚMERO {i+1}---------------------')
    servicios_ok = run_test()
    
    if not servicios_ok:
        print("Los servicios no están disponibles. Deteniendo las pruebas.")
        logging.error('Los servicios no estan disponibles. Deteniendo las pruebas.')
        logging.error('------------------------------------------------------------------------------------')
        break
    
    if i < 4:
        time.sleep(2)