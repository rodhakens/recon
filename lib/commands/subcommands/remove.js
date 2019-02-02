exports.yargs = {
    command: 'remove <expressions...>',
    describe: 'Remove nodes',
    aliases: ['r'],

    builder: (yargs) => {
        const { installReadOptions, installWriteOptions } = require('./handlers/file')

        installReadOptions(yargs)
        installWriteOptions(yargs)

        const { installOutputOptions } = require('./handlers/output')

        installOutputOptions(yargs)
    },

    handler: async(argv) => {
        const { expressions } = argv

        const { recon } = require('./globals/recon')

        const { handleReadOptions, handleWriteOptions } = require('./handlers/file')

        await handleReadOptions(argv, recon)

        const nodes = recon.select(...expressions).map(node => node.data())

        recon.selection.remove()

        await handleWriteOptions(argv, recon)

        const { handleOutputOptions } = require('./handlers/output')

        await handleOutputOptions(argv, nodes)
    }
}