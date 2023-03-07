describe('user', () => {
    it('user values', () => {
        const user = {
            id: "1",
            token: "2",
            name: "3",
            email: "4",
            password: "5"
        }
        expect(user.id).toBe("1")
        expect(user.token).toBe("2")
        expect(user.name).toBe("3")
        expect(user.email).toBe("4")
        expect(user.password).toBe("5")
    })
})