class ValidatorController {

    existsOrError(value) {
        if (!value) return true
        if (Array.isArray(value) && !value.length === 0) return true
        if (typeof value === "string" && !value.trim()) return true
    }

    validateEmail(email) {
        return /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email)
    }

    validateID(value) {
        if (!value.trim() || isNaN(value)) return true
    }

}

module.exports = new ValidatorController()