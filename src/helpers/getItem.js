export const getNumberSelection = ( election ) => {

        switch (election) {
            case 'Rock':
                return 0
                break;

            case 'Paper':
                return 1
                break;

            case 'Scissors':
                return 2
                break;
        
            default:
                return 'Rock'
        }

    }