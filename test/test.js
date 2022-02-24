const Cert = artifacts.require('./Cert.sol');

contract('Cert', function(accounts) {
    it('should issue a certificate', async function() {
        const account = accounts[0];

        try{
            const instance = await Cert.deployed();
            const result = await instance.issueCertificate('John','graduate',{from:account});
            const authority = await instance.owningAuthority.call();
            assert.equal(authority,account);
            assert.equal(result.logs[0].event, 'CertificateIssued');
        } catch(error) {
            console.log(error);
        }
    });



    it('should verify a certificate', async function(){
        const account = accounts[0];
        try{
            const instance = await Cert.deployed();
            const verified = await instance.verifyCertificate('John','graduate',"0x837e31a66aa8eec0d7adfd41f84175803ddcae69afd451598f2672f652b2c153");
            assert.equal(verified,true);
        }
        catch(error) {
            console.log(error);
        }
    });
});