from PIL import Image, ImageFont, ImageDraw
import qrcode
import sys

#En pixeles, son 2.480 x 3.508 para el tamaño carta.
ancho_pagina = 2480
largo_pagina = 3508

"""
Estas settings son las que "mandan" para el formato de los cuadritos.
"""
lado_qr = 250 #Lado del cuadrado en pixeles
separacion_horizontal = 50 #pixeles
separacion_vertical = 55 #pixeles

largo_max_nombre = 15

#En esta lista están las páginas que serán QR-izadas
paginas = ["www.google.com", "www.github.com", "www.facebook.com", "https://i1.rgstatic.net/ii/profile.image/272807896547346-1442053879896_Q128/Marcos-Chait.jpg","www.google.com", "www.github.com", "www.facebook.com", "https://i1.rgstatic.net/ii/profile.image/272807896547346-1442053879896_Q128/Marcos-Chait.jpg"]

#En esta lista están los nombres o identificadores asociados a cada página de qr
nombres = ["Googlggggggesdgdfgdfg", "Githubdhfhgghghfgdfg ", "Facebook22345dhfh67", "Chaitdfgddfgd    ","Google", "Github", "Facebook", "Chgggggggggggggggggggait"]

#Creamos la primera página en blanco.
pagina = Image.new('RGB', (ancho_pagina, largo_pagina), color='white')

"""
Este es un objeto tipo draw, en verdad es la misma página creada arriba, y se puede manipular ambos a la vez
sin problema. Es decir, si le hago algo a la pagina, tambien se modifica el objeto draw y viceversa.
"""
pagina_aux = ImageDraw.Draw(pagina)

#Calculamos cuantos QR caben por columna
cantidad_columna = ancho_pagina//(lado_qr + separacion_horizontal)

#Calculamos cuantos QR caben hacia abajo
cantidad_fila = largo_pagina//(lado_qr + separacion_vertical)

#Seteamos la ubicación inicial (esquina sup izq)
x=0
y=0

"""
Trazo de lineas divisoras
"""
#Primero trazamos las lineas verticales.
for i in range(cantidad_columna+1):

    pagina_aux.line((x,0,x,largo_pagina), fill = 128, width=1)
    x = x + separacion_horizontal + lado_qr

#Luego trazamos las horizontales.
for i in range(cantidad_fila+1):

    pagina_aux.line((0,y,ancho_pagina,y), fill = 128, width=1)
    y = y + separacion_vertical + lado_qr

#Debug, se puede borrar.
print(cantidad_columna)
print(cantidad_fila)

#Seteamos variables de ubicacion de QR.
pos_x = 0
pos_y = 0

#Contadores de qr por fila y por columna
cont_fila = 0
cont_columna = 0

#Numero de paginas que hemos llenado con qr, partimos contando del 0
num_paginas = 0

#Creamos el objeto fuente, aqui puede ser cualquiera, basta con cargar el .ttf
fuente = ImageFont.truetype("arial.ttf", 30)

for i in range(0, len(paginas)):
    print(cont_fila)
    #Si se acaba la fila
    if (cont_fila == cantidad_columna):
        cont_fila = 0

        pos_x = 0
        pos_y = pos_y + lado_qr + separacion_vertical

    #Si se acaba la pagina y quedan imagenes por pegar.
    if (cont_columna == cantidad_fila and cont_fila == cantidad_columna and i < (len(paginas)-1)):
        
        #Guardamos la pagina como .jpg con el nombre pagina_NUMEROPAGINA.jpg 
        pagina.save("pagina_"+str(num_paginas)+".jpg")
        #Avanzamos de pagina
        num_paginas = num_paginas + 1

        #Creamos una pagina en blanco nuevamente.
        pagina = Image.new('RGB', (largo_pagina, ancho_pagina), color='white')
        #Seteamos las ubicaciones en el origen (esquina superior izquierda)
        pos_x = 0
        pos_y = 0

    #Creamos un objeto qr vacio
    qr = qrcode.QRCode(box_size = 240, border = 0.5)

    #Le agregamos el link
    qr.add_data(paginas[i])

    #No me acuerdo que era esto, pero dejalo.
    qr.make(fit=True)
    
    #Opciones de color del qr, negro y blanco es lo normal.
    img_qr = qr.make_image(fill_color="black", back_color="white")

    #Le damos el tamaño la imagen con el qr.
    img_qr = img_qr.resize((lado_qr,lado_qr))

    #Guardamos en el directorio actual la imagen.jpg (el qr). Esto es más que nada un DEBUG, se puede borrar
    #img_qr.save(str(i)+".jpg")

    #Pegamos la imagen del qr en la página.
    pagina.paste(img_qr, (pos_x+int(separacion_vertical/2), pos_y))
    
    #Escribimos el nombre del item debajo del qr
    pagina_aux.text((pos_x + int(separacion_vertical/2),pos_y + lado_qr), nombres[i][0:14], fill = (0,0,0), font = fuente)
    
    #Avanzamos hacia la derecha.
    pos_x = pos_x + lado_qr + separacion_horizontal
    cont_fila = cont_fila + 1

    #pos_y = lado_qr + separacion_vertical

    #imagenes_qr.append(img_qr)

pagina_dos = Image.new('RGB', (ancho_pagina, largo_pagina), color='white')
pagina.save("pagina_"+str(num_paginas)+".jpg")

