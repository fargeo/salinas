using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace ArchesPane
{
    /// <summary>
    /// Interaction logic for Dockpane1View.xaml
    /// </summary>
    public partial class Dockpane1View : UserControl
    {
        public Dockpane1View()
        {
            InitializeComponent();

            List<ArchesAttribute> items = new List<ArchesAttribute>
            {
                new ArchesAttribute() { Name = "attr1", Desc = "Attribute #1" },
                new ArchesAttribute() { Name = "attr2", Desc = "Attribute #2" },
                new ArchesAttribute() { Name = "attr3", Desc = "Attribute #3" }
            };
            ArchesAttributeList.ItemsSource = items;
        }
    }

    public class ArchesAttribute
    {
        public string Name { get; set; }
        public string Desc { get; set; }
    }
}
