<template>
    <h1 class="title">Hello app</h1>
    <el-button type="primary">按钮</el-button>
    <ul>
        <li>
            <router-link to="/home">Home</router-link>
        </li>
        <li>
            <router-link to="/about">About</router-link>
        </li>
    </ul>

    <router-view />
</template>

<script>
import Home from "./view/Home"

export default {
    name: "App",
}
</script>

<style>
.title {
    color: red;
}
</style>