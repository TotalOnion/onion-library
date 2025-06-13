module.exports = function (newBlockName) {
    return `describe('${newBlockName}', () => {
	it('Gets, types and asserts', () => {
		cy.visit('/_block-reference');
		cy.get('.${newBlockName}');
	});
});
`;
}