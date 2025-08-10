'use client';

import { useCallback, useState } from 'react';
// import { AlertDialog, AlertDialogContent, AlertDialogTitle } from '../ui/alert-dialog';
import Button from '../ui/button';
// import { Deleteicon } from './icons/AllIcons';
import { toast } from 'sonner';
import { AlertDialog, AlertDialogContent, AlertDialogTitle } from '../ui/alert-dialog';
import { DeleteIcon, Trash } from 'lucide-react';

type DeleteActionProps = {
  handleDeleteSubmit: Function;
  isLoading?: boolean;
  isOnlyIcon?: boolean;
};

const DeleteAction: React.FC<DeleteActionProps> = ({
  handleDeleteSubmit,
  isLoading,
  isOnlyIcon,
}) => {
  const [open, setOpen] = useState(false);

  const handleDelete = useCallback(async () => {
    try {
      await handleDeleteSubmit();
      setOpen(false);
      toast(`Deleted Successfully`);
    } catch (err: any) {
      for (const key of err.errors) {
        toast(`${key?.attr}- ${key?.detail}`);
      }
    }
  }, [handleDeleteSubmit]);

  return (
    <div>
      <AlertDialog open={open} onOpenChange={() => setOpen(!open)}>
        <div onClick={() => setOpen(!open)} className="cursor-pointer text-red-500 w-fit">
          {isOnlyIcon ? (
            <div className=" hover:bg-red-100 rounded-full w-fit  transition">
              <DeleteIcon />
            </div>
          ) : (
            <div className="flex items-center gap-2 hover:text-red-600 transition">
              <DeleteIcon /> Delete
            </div>
          )}
        </div>

        <AlertDialogContent className=" !max-w-[350px]  text-left">
          <AlertDialogTitle></AlertDialogTitle>
          <div className="flex flex-col items-start gap-4">
            <Trash size={'48'} className="text-red-500" />
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Confirm Deletion</h3>
              <p className="text-gray-600 mt-1">
                This cannot be undone. All linked data will be permanently removed.
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-between gap-4">
            <Button
              label="Cancel"
              className=""
              onClick={() => setOpen(false)}
              variant="outline"
            ></Button>
            <Button
              label={`${isLoading ? 'Deleting...' : 'Delete'}`}
              className="bg-red-500 text-white"
              onClick={handleDelete}
            ></Button>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteAction;
