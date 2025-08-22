<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">User Information Form</h1>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username"
              />
              <div v-if="errors.username" class="text-danger">
                {{ errors.username }}
              </div>
            </div>
            <div class="col-md-6 col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">
                {{ errors.password }}
              </div>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
              <div class="form-check">
                <label class="form-check-label" for="isAustralian">Australian Resident?</label>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input ms-1"
                    type="radio"
                    id="resYes"
                    value="yes"
                    @change="validateResident(true)"
                    v-model="formData.isAustralian"
                  />
                  <label class="form-check-label" for="resYes">Yes</label>
                </div>

                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    id="resNo"
                    value="no"
                    @change="validateResident(true)"
                    v-model="formData.isAustralian"
                  />
                  <label class="form-check-label" for="resNo">No</label>
                </div>
                <div v-if="errors.resident" class="text-danger mt-1">
                  {{ errors.resident }}
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-6">
              <label for="gender" class="form-label">Gender</label>
              <select
                class="form-select"
                id="gender"
                @blur="() => validateGender(true)"
                @change="validateGender(true)"
                @input="() => validateGender(false)"
                v-model="formData.gender"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="text-danger mt-1">
                {{ errors.gender }}
              </div>
            </div>
          </div>
          <div class="mb-3">
            <label for="reason" class="form-label">Reason for joining</label>
            <textarea
              class="form-control"
              id="reason"
              rows="3"
              v-model="formData.reason"
              @blur="() => validateReason(true)"
              @input="() => validateReason(false)"
              minlength="4"
              maxlength="100"
            ></textarea>
            <div class="form-text">Please write 4–100 characters.</div>
            <div v-if="errors.reason" class="text-danger mt-1">
              {{ errors.reason }}
            </div>
          </div>
          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
      </div>
    </div>
    <DataTable
      v-if="submittedCards.length"
      :value="submittedCards"
      paginator
      :rows="5"
      :rowsPerPageOptions="[5, 10, 20]"
      sortMode="multiple"
      stripedRows
      showGridlines
      tableStyle="min-width: 50rem"
      responsiveLayout="scroll"
      class="mt-3"
    >
      <Column field="username" header="Username" sortable />

      <Column header="Password" sortable>
        <template #body="{ data }">
          {{ data.password }}
        </template>
      </Column>

      <Column header="Australian Resident" sortable>
        <template #body="{ data }">
          {{ data.isAustralian === 'yes' ? 'Yes' : 'No' }}
        </template>
      </Column>

      <Column field="gender" header="Gender" sortable />

      <Column header="Reason">
        <template #body="{ data }">
          {{ data.reason }}
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const formData = ref({
  username: '',
  password: '',
  isAustralian: '',
  reason: '',
  gender: '',
})

const submittedCards = ref([])

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateResident(true)
  validateGender(true)
  validateReason(true)

  if (Object.values(errors.value).some(Boolean)) return

  submittedCards.value.push({ ...formData.value })
  clearForm()
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    isAustralian: '',
    reason: '',
    gender: '',
  }
}

const errors = ref({
  username: null,
  password: null,
  resident: null,
  gender: null,
  reason: null,
})

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

const validateResident = (blur) => {
  const v = formData.value.isAustralian
  if (v !== 'yes' && v !== 'no') {
    if (blur) errors.value.resident = 'Please select Yes or No.'
  } else {
    errors.value.resident = null
  }
}

const validateGender = (blur) => {
  const g = formData.value.gender
  if (!g) {
    if (blur) errors.value.gender = 'Please select a gender.'
  } else {
    errors.value.gender = null
  }
}

const validateReason = (blur) => {
  const txt = (formData.value.reason || '').trim()
  if (!txt) {
    if (blur) errors.value.reason = 'Reason is required.'
  } else if (txt.length < 4) {
    if (blur) errors.value.reason = 'Reason must be at least 4 characters.'
  } else if (txt.length > 100) {
    if (blur) errors.value.reason = 'Reason must be 100 characters or fewer.'
  } else {
    errors.value.reason = null
  }
}
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
</style>
