<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">{{ projectName }}</h3>
      </div>

      <el-form-item prop="username">
        <span class="icon-container">
          <jz-icon icon="user" />
        </span>
        <el-input
          ref="usernameRef"
          v-model="loginForm.account"
          placeholder="请输入账号"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip
        v-model="capsTooltip"
        content="Caps lock is On"
        placement="right"
        manual
      >
        <el-form-item prop="password">
          <span class="icon-container">
            <jz-icon icon="lock" />
          </span>
          <el-input
            :key="passwordType"
            ref="passwordRef"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="请输入密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <jz-icon :icon="passwordType !== 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <el-button
        :loading="loading"
        type="primary"
        style="width: 100%; margin-bottom: 30px"
        @click="handleLogin"
        >登录
      </el-button>
    </el-form>

  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, nextTick } from 'vue'

import { projectName } from '@/config'

import loginRules from './login-rules'
import checkUserIsLogin from './check-login'
import useLoginFormFocus from './login-form-focus'
import useTogglePwdInputType from './pwd-input-type'
import useCapsTips from './caps-tip'
import useUserLogin from './user-login'

export default defineComponent({
  name: 'Login',
  setup() {
    // 检查登录态
    checkUserIsLogin()

    // 初始化表单
    const loginForm = reactive<LoginRequestModel>({
      account: '',
      password: ''
    })

    // 引用账号和密码输入框
    const usernameRef = ref<HTMLInputElement>()
    const passwordRef = ref<HTMLInputElement>()

    // 自动聚焦输入框
    onMounted(() => {
      useLoginFormFocus(loginForm, usernameRef, passwordRef)
    })

    // 密码输入框类型
    const {
      showPwd,
      passwordType
    } = useTogglePwdInputType(passwordRef)
    

    // 检查是否打开大小写
    const {
      capsTooltip,
      checkCapslock
    } = useCapsTips()

    // 点击登录
    const {
      loginFormRef,
      loading,
      handleLogin
    } = useUserLogin(loginForm)

    return {
      projectName,
      loginForm,
      loginRules,
      passwordType,
      showPwd,
      capsTooltip,
      checkCapslock,
      usernameRef,
      passwordRef,
      loginFormRef,
      loading,
      handleLogin
    }
  },
})
</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .icon-container {
    padding: 6px 0 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    display: inline-block;
    text-align: center;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
