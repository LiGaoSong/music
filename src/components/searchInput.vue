<template>
  <div class="search">
    <div class="login">
      <el-button class="login-button" @click="dialogVisible = true"
        >登录</el-button
      >
    </div>
    <div class="search-item">
      <input placeholder="搜索" class="search-input" type="text" />
      <!-- <el-input class="w-50 m-2 search-input" size="large" placeholder="Please Input" v-model="keyword" /> -->

      <el-button class="search-button"
        ><i class="iconfont icon-sousuo"></i
      ></el-button>
    </div>
    <el-dialog v-model="dialogVisible" title="登录" width="30%">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="rules"
        label-width="120px"
        class="demo-ruleForm"
      >
        <el-form-item label="账号" prop="username">
          <el-input
            v-model="ruleForm.username"
            type="text"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            v-model="ruleForm.pass"
            type="password"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)"
              >登录</el-button
            >
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          </el-form-item>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from "@vue/reactivity";
name: "SearchInput";
const ruleFormRef = ref();

const validateUserName = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入账号"));
  } else {
    if (ruleForm.checkPass !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass", () => null);
    }
    callback();
  }
};
const validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (ruleForm.checkPass !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass", () => null);
    }
    callback();
  }
};

const ruleForm = reactive({
  username:'',
  pass: "",
});

const rules = reactive({
  pass: [{ validator: validatePass, trigger: "blur" }],
  username: [{ validator: validateUserName, trigger: "blur" }],
});

const submitForm = (formEl) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl) => {
  if (!formEl) return;
  formEl.resetFields();
};

const dialogVisible = ref(false);
const keyword = ref("");
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  height: 80px;
  text-align: center;
  background-color: #f3f3f3;
  .login {
    margin-right: 50px;
  }
  .search-item {
    display: flex;
    .search-input {
      width: 200px;
      border: none;
      padding-left: 15px;
      outline: none;
    }
    .search-button {
      margin: 0 15px;
      font-size: var(--text18);
    }
  }
  .login-button,
  .search-button,
  .search-input {
    height: 42px;
    border-radius: 10px;
    background: linear-gradient(145deg, #f6f6f6, #cfcfcf);
    box-shadow: 6px 6px 13px #bdbdbd, -6px -6px 13px #ffffff;
    border: none;
  }
}
.dialog-footer button:first-child {
  margin-right: 10px;
}

</style>
