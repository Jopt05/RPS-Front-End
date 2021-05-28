export const getItem = ( election ) => {

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

            case 0:
                return 'Rock'
                break;

            case 1:
                return 'Paper'
                break;

            case 2:
                return 'Scissors'
                break;
        
            default:
                break;
        }

    }