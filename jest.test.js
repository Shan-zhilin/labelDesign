test('2 + 2 = 4', () => {
    expect(2 + 2).toBe(4);
    expect(2 + 2).not.toBe(5);

})

test('布尔值', () => {
    expect(1).toBeTruthy();
    expect(0).toBeFalsy();
})