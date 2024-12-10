from datetime import datetime

# Получаем текущее время
current_time = datetime.now()

# Форматируем время в нужном формате
formatted_time = current_time.strftime("%H.%M/%d/%m")

# Выводим результат
print(formatted_time)