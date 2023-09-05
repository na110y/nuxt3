<template>
  <div class="toast" :class="{ active: message }">
    <div class="toast-content">
      <div class="check">✔</div>
      <div class="message">
        <div class="text text-1">Thành Công</div>
        <div class="text">{{ message }}</div>
      </div>
      <div class="close" @click="closeToast">×</div>
    </div>
    <div class="progress" :class="{ active: message }">
      <div class="progress-bar"></div>
    </div>
  </div>
</template>

<script setup>

import {ref, computed, onMounted} from "vue";
import {store} from "~/store";

const closeToast = () => {
  store.commit('CLEAR_TOAST_MESSAGE')
}
const message = computed(() => store.getters.toastMessage);

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
  overflow: hidden;
}

.toast {
  position: fixed;
  top: 105px;
  right: 16px;
  border-radius: 12px;
  background: #fff;
  padding: 5px 20px 10px 10px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  border-left: 5px solid #47CF73;
  overflow: hidden;
  transform: translateX(calc(100% + 30px));
  transition: all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.35);
}

.toast.active {
  transform: translateX(0%);
}

.toast .toast-content {
  display: flex;
  align-items: center;
}

.toast-content .check {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 25px;
  width: 25px;
  background-color: #47CF73;
  color: #fff;
  font-size: 20px;
  border-radius: 50%;
}

.toast-content .message {
  display: flex;
  flex-direction: column;
  margin: 0 20px;
}

.message .text {
  font-size: 18px;
  font-weight: 400;;
  color: #666666;
}

.message .text.text-1 {
  font-weight: 600;
  color: #333;
}

.toast .close {
  position: absolute;
  top: 10px;
  right: 15px;
  padding: 5px;
  cursor: pointer;
  opacity: 0.7;
}

.toast .close:hover {
  opacity: 1;
}

.toast .progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
  background: #ddd;
}

.toast .progress:before {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  height: 100%;
  width: 100%;
  background-color: #47CF73;
}

.progress.active:before {
  animation: progress 5s linear forwards;
}

@keyframes progress {
  100% {
    right: 100%;
  }
}

button {
  padding: 12px 20px;
  font-size: 20px;
  outline: none;
  border: none;
  background-color: #4070f4;
  color: #fff;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s;
}

button:hover {
  background-color: #0e4bf1;
}

.toast.active ~ button {
  pointer-events: none;
}

</style>
