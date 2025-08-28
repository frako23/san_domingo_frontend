<template>
  <div class="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100">
    <div
      v-if="currentScreen === 'home'"
      class="min-h-screen flex flex-col justify-center p-4"
    >
      <div class="max-w-4xl mx-auto text-center">
        <div class="mb-12">
          <div class="text-8xl md:text-9xl mb-6">☕</div>
          <h1 class="text-5xl md:text-7xl font-bold text-amber-900 mb-4">
            Café San Domingo
          </h1>
          <p class="text-xl md:text-2xl text-amber-700 mb-8 max-w-2xl mx-auto">
            Desde 1945, llevando el mejor café dominicano a tu mesa con
            tradición y calidad excepcional
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div class="text-4xl mb-4">🌱</div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
              100% Natural
            </h3>
            <p class="text-gray-600">
              Granos seleccionados de las mejores montañas dominicanas
            </p>
          </div>
          <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div class="text-4xl mb-4">🏆</div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
              Calidad Premium
            </h3>
            <p class="text-gray-600">
              Más de 75 años perfeccionando nuestro proceso de tostado
            </p>
          </div>
          <div class="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg">
            <div class="text-4xl mb-4">❤️</div>
            <h3 class="text-xl font-semibold text-gray-800 mb-2">
              Tradición Familiar
            </h3>
            <p class="text-gray-600">
              Recetas transmitidas de generación en generación
            </p>
          </div>
        </div>
        <button
          @click="goToCoffeeSelector"
          class="bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 px-8 rounded-xl text-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          Explorar Nuestros Cafés
        </button>
      </div>
    </div>

    <div v-if="currentScreen === 'selector'" class="p-4">
      <div class="max-w-4xl mx-auto">
        <div class="items-center justify-between mb-8">
          <div class="flex justify-between items-center my-2.5 w-full">
            <span class="text-3xl font-semibold">{{ userData.name }}</span>
            <div>
              <span class="text-5xl font-semibold">☕</span
              ><span class="text-5xl font-semibold">{{
                userData.cafes_restantes
              }}</span>
            </div>
          </div>
          <div class="text-center flex-1">
            <h1 class="text-3xl md:text-4xl font-bold text-amber-900 mb-2">
              Café San Domingo
            </h1>
            <p class="text-amber-700">
              Elige tu café favorito y la cantidad que deseas
            </p>
          </div>
          <div class="w-24"></div>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div
            v-for="coffee in coffeeTypes"
            :key="coffee.id"
            @click="selectCoffee(coffee.id)"
            :class="[
              'bg-white rounded-xl shadow-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105',
              selectedCoffee === coffee.id
                ? 'ring-4 ring-amber-500 bg-amber-50'
                : '',
            ]"
          >
            <div class="text-center">
              <div class="text-6xl mb-4">{{ coffee.emoji }}</div>
              <h3 class="text-xl font-semibold text-gray-800 mb-2">
                {{ coffee.name }}
              </h3>
              <p class="text-gray-600 text-sm mb-4">
                {{ coffee.description }}
              </p>
            </div>
          </div>
        </div>
        <div
          v-if="selectedCoffee"
          class="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <h3 class="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Selecciona la cantidad
          </h3>
          <div class="flex items-center justify-center space-x-4">
            <button
              @click="decreaseQuantity"
              :disabled="quantity <= 1"
              class="w-12 h-12 rounded-full bg-amber-500 text-white font-bold text-xl hover:bg-amber-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              -
            </button>
            <div
              class="text-4xl font-bold text-gray-800 min-w-[80px] text-center"
            >
              {{ quantity }}
            </div>
            <button
              @click="increaseQuantity"
              class="w-12 h-12 rounded-full bg-amber-500 text-white font-bold text-xl hover:bg-amber-600 transition-colors"
            >
              +
            </button>
          </div>
        </div>
        <div v-if="selectedCoffee" class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-2xl font-semibold text-gray-800 mb-4 text-center">
            Resumen del Pedido
          </h3>
          <div class="space-y-3">
            <div class="flex justify-between items-center text-lg">
              <span class="text-gray-700">Café seleccionado:</span>
              <span class="font-semibold text-amber-700">
                {{ selectedCoffeeData.name }}
              </span>
            </div>
            <div class="flex justify-between items-center text-lg">
              <span class="text-gray-700">Cantidad:</span>
              <span class="font-semibold text-amber-700">{{ quantity }}</span>
            </div>
            <div class="flex justify-between items-center text-lg">
              <span class="text-gray-700">Precio unitario:</span>
              <span class="font-semibold text-amber-700">
                ${{ selectedCoffeeData.price }}
              </span>
            </div>
            <hr class="border-gray-300" />
            <div class="flex justify-between items-center text-xl font-bold">
              <span class="text-gray-800">Total:</span>
              <span class="text-amber-600">
                ${{ (selectedCoffeeData.price * quantity).toFixed(2) }}
              </span>
            </div>
          </div>
          <button
            @click="placeOrder"
            class="w-full mt-6 bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-6 rounded-lg text-lg transition-colors shadow-lg hover:shadow-xl"
          >
            Realizar Pedido
          </button>
        </div>
        <div
          v-if="showConfirmation"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          @click="closeConfirmation"
        >
          <div
            class="bg-white rounded-xl p-8 max-w-md w-full text-center"
            @click.stop
          >
            <div class="text-6xl mb-4">✅</div>
            <h3 class="text-2xl font-bold text-gray-800 mb-4">
              ¡Pedido Confirmado!
            </h3>
            <p class="text-gray-600 mb-6">
              Tu pedido de {{ quantity }} {{ selectedCoffeeData.name }} ha sido
              procesado exitosamente.
            </p>
            <button
              @click="closeConfirmation"
              class="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-6 rounded-lg transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { decodeCredential, googleOneTap } from "vue3-google-login";
import {
  createUser,
  get_current_user_data,
  sendTokenToApi,
} from "./utils/functions";
import { coffeeTypes } from "./utils/data";

const currentScreen = ref("home");
const userData = ref(null);

const selectedCoffee = ref(null);
const quantity = ref(1);
const showConfirmation = ref(false);

const selectedCoffeeData = computed(() => {
  return coffeeTypes.find((coffee) => coffee.id === selectedCoffee.value) || {};
});

const goToCoffeeSelector = () => {
  // Se añade la verificación de usuario para evitar que se entre sin autenticación
  if (userData.value) {
    currentScreen.value = "selector";
  } else {
    // Si no hay usuario, se podría forzar el inicio de sesión
    alert("Debes iniciar sesión para explorar nuestros cafés.");
  }
};

const selectCoffee = (coffeeId) => {
  selectedCoffee.value = coffeeId;
  quantity.value = 1;
};

const increaseQuantity = () => {
  quantity.value++;
};

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--;
  }
};

const placeOrder = () => {
  showConfirmation.value = true;
};

const closeConfirmation = () => {
  showConfirmation.value = false;
  selectedCoffee.value = null;
  quantity.value = 1;
};

onMounted(async () => {
  const userStr = localStorage.getItem("user");
  let tokenFromStorage = null;

  if (userStr) {
    try {
      const storedUser = JSON.parse(userStr);
      if (storedUser.hd === "atenasconsultores.com") {
        console.log("Usuario encontrado en localStorage. Refrescando datos...");

        const response = await googleOneTap({ autoLogin: true });
        tokenFromStorage = response.credential;
        localStorage.setItem("token", tokenFromStorage); // <-- LÍNEA AGREGADA
      } else {
        console.log(
          "El usuario en localStorage no pertenece a Atenas Consultores. Limpiando..."
        );
        localStorage.removeItem("user");
        localStorage.removeItem("token"); // <-- También limpiamos el token viejo
      }
    } catch (e) {
      console.error("Error al parsear el usuario de localStorage:", e);
      localStorage.removeItem("user");
      localStorage.removeItem("token"); // <-- Y aquí también
    }
  }

  // --- Lógica Principal ---

  if (tokenFromStorage) {
    const freshUserData = await get_current_user_data(tokenFromStorage);
    userData.value = freshUserData;
    currentScreen.value = "selector";
    console.log(
      "Datos del usuario refrescados desde el backend:",
      userData.value
    );
  } else if (!userData.value) {
    console.log("No hay usuario, iniciando Google One Tap...");
    try {
      const response = await googleOneTap({ autoLogin: true });
      const idToken = response.credential;
      const decodedUser = decodeCredential(idToken);

      if (decodedUser.hd === "atenasconsultores.com") {
        localStorage.setItem("user", JSON.stringify(decodedUser));
        localStorage.setItem("token", idToken); // <-- LÍNEA AGREGADA

        await sendTokenToApi(idToken);
        await createUser(
          decodedUser.given_name,
          decodedUser.family_name,
          decodedUser.email
        );

        const finalUserData = await get_current_user_data(idToken);
        userData.value = finalUserData;
        currentScreen.value = "selector";
        console.log(
          "Usuario nuevo autenticado y creado. Datos finales:",
          userData.value
        );
      } else {
        alert("Por favor, utiliza una cuenta de Atenas Consultores");
      }
    } catch (error) {
      console.log("El usuario no inició sesión con Google One Tap:", error);
    }
  }
});
</script>
