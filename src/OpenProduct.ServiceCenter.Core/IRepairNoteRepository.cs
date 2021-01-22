using OpenProduct.ServiceCenter.Core;
using System.Collections.Generic;

namespace OpenProduct.ServiceCenter.DataRepository
{
    public interface IRepairNoteRepository
    {
        IEnumerable<RepairNote> GetMostRecent();
    }
}
