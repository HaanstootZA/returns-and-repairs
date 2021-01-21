using System;
using System.Collections.Generic;
using System.Text;

namespace OpenProduct.ServiceCenter.Core
{
    public class RepairNote
    {
        public string Id { get; set; }
        public string Capturer { get; set; }
        public RepairNoteLine[] Lines { get; set; }
    }
}
